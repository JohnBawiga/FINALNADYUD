package nstpcapstone1.sims.Service;

import nstpcapstone1.sims.Entity.AnnouncementEntity;
import nstpcapstone1.sims.Repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    @Autowired
    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public AnnouncementEntity createAnnouncement(AnnouncementEntity announcementEntity) {
        return announcementRepository.save(announcementEntity);
    }

    public AnnouncementEntity getAnnouncementById(Long announcementID) {
        Optional<AnnouncementEntity> announcementOptional = announcementRepository.findById(announcementID);
        return announcementOptional.orElse(null);
    }

    public AnnouncementEntity updateAnnouncement(Long id, AnnouncementEntity updatedAnnouncement) {
        AnnouncementEntity existingAnnouncement = announcementRepository.findById(id).orElse(null);
        if (existingAnnouncement != null) {
            // Update existingAnnouncement fields with updatedAnnouncement fields
            existingAnnouncement.setTitle(updatedAnnouncement.getTitle());
            existingAnnouncement.setDescription(updatedAnnouncement.getDescription());
            existingAnnouncement.setDate(updatedAnnouncement.getDate());
            existingAnnouncement.setImage(updatedAnnouncement.getImage());
            existingAnnouncement.setAdminID(updatedAnnouncement.getAdminID());

            // Save and return the updated announcement
            return announcementRepository.save(existingAnnouncement);
        } else {
            // If announcement with given id not found, return null or throw exception
            return null;
        }
    }
    public void deleteAnnouncement(Long announcementID) {
        announcementRepository.deleteById(announcementID);
    }

    public List<AnnouncementEntity> getAllAnnouncements() {
        return announcementRepository.findAll();
    }
    public AnnouncementEntity saveAnnouncement(AnnouncementEntity announcement) {
        return announcementRepository.save(announcement);
    }
   
}
