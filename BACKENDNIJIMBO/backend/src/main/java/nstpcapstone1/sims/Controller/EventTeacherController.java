package nstpcapstone1.sims.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import nstpcapstone1.sims.Entity.EventTeacherEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.EventTeacherRepository;
import nstpcapstone1.sims.Service.EventTeacherService;

@RestController
@CrossOrigin(origins="*")
public class EventTeacherController {

    private final EventTeacherService eventTeacherService;
    private final EventTeacherRepository eventTeacherRepository;
    
    @Autowired
    public EventTeacherController(EventTeacherService eventTeacherService, EventTeacherRepository eventTeacherRepository) {
        this.eventTeacherService = eventTeacherService;
        this.eventTeacherRepository = eventTeacherRepository;
    }

    @PostMapping("/assignTeacherToEvent")
    public String assignTeacherToEvent(@RequestBody EventTeacherEntity eventTeacherEntity) {
        try {
            eventTeacherService.assignTeacherToEvent(eventTeacherEntity);
            return "Teacher assigned to event successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to assign teacher to event";
        }
    }	
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<EventTeacherEntity>> getByEventId(@PathVariable Long eventId) {
        List<EventTeacherEntity> eventTeachers = eventTeacherRepository.findByEventEventID(eventId);
        if (eventTeachers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(eventTeachers, HttpStatus.OK);
    }
    @GetMapping("/teacherevents123/{userid}")
    public ResponseEntity<List<EventTeacherEntity>> getByUserId(@PathVariable Long userid) {
        List<EventTeacherEntity> eventTeachers = eventTeacherRepository.findByTeacherUserid(userid);
        if (eventTeachers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(eventTeachers, HttpStatus.OK);
    }
    
   
}
