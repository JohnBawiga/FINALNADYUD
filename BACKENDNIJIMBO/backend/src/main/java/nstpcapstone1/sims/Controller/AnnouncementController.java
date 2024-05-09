package nstpcapstone1.sims.Controller;

import nstpcapstone1.sims.Entity.AnnouncementEntity;
import nstpcapstone1.sims.Repository.AnnouncementRepository;
import nstpcapstone1.sims.Service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/announcements")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @Autowired
    private AnnouncementRepository announcementRepository;


    // Read operation
    @GetMapping("getann/{announcementID}")
    public ResponseEntity<AnnouncementEntity> getAnnouncementById(@PathVariable Long announcementID) {
        AnnouncementEntity announcement = announcementService.getAnnouncementById(announcementID);
        return ResponseEntity.ok(announcement);
    }

    // Update operation
    @PutMapping("/updateann/{announcementID}")
    public ResponseEntity<AnnouncementEntity> updateAnnouncement(@PathVariable Long announcementID, @RequestBody AnnouncementEntity updatedAnnouncement) {
        AnnouncementEntity existingAnnouncement = announcementService.getAnnouncementById(announcementID);

        if (existingAnnouncement == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the existing announcement with the new details
        existingAnnouncement.setTitle(updatedAnnouncement.getTitle());
        existingAnnouncement.setDescription(updatedAnnouncement.getDescription());
        existingAnnouncement.setDate(updatedAnnouncement.getDate());
        existingAnnouncement.setImage(updatedAnnouncement.getImage());
        existingAnnouncement.setAdminID(updatedAnnouncement.getAdminID());

        // Save the updated announcement
        AnnouncementEntity savedAnnouncement = announcementService.saveAnnouncement(existingAnnouncement);
        
        return ResponseEntity.ok(savedAnnouncement);
    }
   

    // Delete operation
    @DeleteMapping("deleteann/{announcementID}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long announcementID) {
        announcementService.deleteAnnouncement(announcementID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Get all announcements
    @GetMapping("getall")
    
    public ResponseEntity<List<AnnouncementEntity>> getAllAnnouncements() {
        List<AnnouncementEntity> announcements = announcementService.getAllAnnouncements();
        return ResponseEntity.ok(announcements);
    }
    
    @PostMapping("createann")
    public ResponseEntity<AnnouncementEntity> createAnnouncement(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("date") Date date,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("adminID") Long adminID) {
        try {
            // Create a new AnnouncementEntity
            AnnouncementEntity announcement = new AnnouncementEntity();
            announcement.setTitle(title);
            announcement.setDescription(description);
            announcement.setDate(date);
            announcement.setAdminID(adminID);

            // If image is provided, set it
            if (image != null && !image.isEmpty()) {
                byte[] imageData = image.getBytes();
                announcement.setImage(imageData);
            }

            // Save the announcement
            AnnouncementEntity savedAnnouncement = announcementRepository.save(announcement);

            return new ResponseEntity<>(savedAnnouncement, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
}
