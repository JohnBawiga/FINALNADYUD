package nstpcapstone1.sims.Controller;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import nstpcapstone1.sims.Entity.EventEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.EventRepository;
import nstpcapstone1.sims.Service.EventService;
import nstpcapstone1.sims.Service.TeacherService;

@RestController
@CrossOrigin(origins="*")
public class EventController {
	@Autowired
    private EventRepository eventRepository;
	private TeacherService teacherService;
	private EventService eventService;
	
	@PostMapping("/events")
	public ResponseEntity<EventEntity> createEvent(
	        @RequestParam("eventTitle") String eventTitle,
	        @RequestParam("eventStart") Date eventStart,
	        @RequestParam("eventEnd") Date eventEnd,
	        @RequestParam(value = "image", required = false) MultipartFile image,
	        @RequestParam("description") String description) {
	    try {
	        // Create a new EventEntity
	        EventEntity event = new EventEntity();
	        event.setEventTitle(eventTitle);
	        event.setEventStart(eventStart);
	        event.setEventEnd(eventEnd);
	        event.setDescription(description);

	        // If image is provided, set it
	        if (image != null && !image.isEmpty()) {
	            byte[] imageData = image.getBytes();
	            event.setImage(imageData);
	        }

	        // Save the event
	        EventEntity savedEvent = eventRepository.save(event);

	        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
	    } catch (Exception e) {
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
    @GetMapping("/getEvents")
    public List<EventEntity> getEvents(){
        return eventRepository.findAll();
    }
   
}
