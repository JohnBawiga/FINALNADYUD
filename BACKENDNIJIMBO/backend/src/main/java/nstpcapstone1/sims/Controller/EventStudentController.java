package nstpcapstone1.sims.Controller;

import java.util.Date;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import nstpcapstone1.sims.Entity.EventStudentEntity;
import nstpcapstone1.sims.Repository.EventStudentRepository;
import nstpcapstone1.sims.Service.EventStudentService;

@RestController
@CrossOrigin(origins="*")
public class EventStudentController{
	 private final EventStudentService eventStudentService;
	    private final EventStudentRepository eventStudentRepository;
	    
	    @Autowired
	    public EventStudentController(EventStudentService eventStudentService, EventStudentRepository eventStudentRepository) {
	        this.eventStudentService = eventStudentService;
	        this.eventStudentRepository = eventStudentRepository;
	    }

	    @PostMapping("/assignStudentToEvent")
	    public String assignStudentToEvent(@RequestBody EventStudentEntity eventStudentEntity) {
	        try {
	            eventStudentService.assignStudentToEvent(eventStudentEntity);
	            return "Student assigned to event successfully";
	        } catch (Exception e) {
	            e.printStackTrace();
	            return "Failed to assign Student to event";
	        }
	    }
	    @GetMapping("/Studentevent/{eventId}")
	    public ResponseEntity<List<EventStudentEntity>> getByEventId(@PathVariable Long eventId) {
	        List<EventStudentEntity> eventStudents = eventStudentRepository.findByEventEventID(eventId);
	        if (eventStudents.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(eventStudents, HttpStatus.OK);
	    }
	    @PutMapping("/register/{id}")
	    public ResponseEntity<String> updateRegistrationStatus(@PathVariable Long id, @RequestParam boolean isRegistered) {
	        EventStudentEntity eventStudentEntity = eventStudentService.findById(id);
	        if (eventStudentEntity == null) {
	            return new ResponseEntity<>("Event Student not found with ID: " + id, HttpStatus.NOT_FOUND);
	        }

	        eventStudentEntity.setRegistered(isRegistered);
	        eventStudentService.save(eventStudentEntity);

	        return new ResponseEntity<>("Registration status updated successfully", HttpStatus.OK);
	    }
	    @PostMapping("/createStudentEvent")
	    public ResponseEntity<EventStudentEntity> createEventStudent(@RequestBody EventStudentEntity eventStudentEntity) {
	        EventStudentEntity createdEventStudent = eventStudentService.createEventStudent(eventStudentEntity);
	        return new ResponseEntity<>(createdEventStudent, HttpStatus.CREATED);
	    }
	    @GetMapping("/getallstudentevents")
	    public ResponseEntity<List<EventStudentEntity>> getAllEventStudents() {
	        List<EventStudentEntity> eventStudents = eventStudentRepository.findAll();
	        return new ResponseEntity<>(eventStudents, HttpStatus.OK);
	    }
	    
	    @GetMapping("/getstatus/{userid}/{eventID}")
	    public ResponseEntity<List<EventStudentEntity>> getByUserIdAndEventId(@PathVariable Long userid, @PathVariable Long eventID) {
	        List<EventStudentEntity> eventStudents = eventStudentRepository.findByStudentUseridAndEventEventID(userid, eventID);
	        if (eventStudents.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(eventStudents, HttpStatus.OK);
	    }
	   
	    @PostMapping("/{eventId}/{studentId}/update-time")
	    public ResponseEntity<String> updateTimeInAndOut(@PathVariable("eventId") Long eventId, 
	                                                      @PathVariable("studentId") Long studentId) {
	        EventStudentEntity eventStudent = eventStudentService.findByEventIdAndStudentId(eventId, studentId);

	        if (eventStudent == null) {
	            return new ResponseEntity<>("Event student with event ID " + eventId + " and student ID " + studentId + " not found", HttpStatus.NOT_FOUND);
	        }

	        if (eventStudent.getTimeIN() == null) {
	            // If there's no time in yet, update timeIN
	            eventStudent.setTimeIN(new Date());
	            eventStudentService.save(eventStudent);
	            return new ResponseEntity<>("Time in updated successfully", HttpStatus.OK);
	        } else {
	            // If there's already a time in, update timeOUT
	            eventStudent.setTimeOUT(new Date());
	            eventStudentService.save(eventStudent);
	            return new ResponseEntity<>("Time out updated successfully", HttpStatus.OK);
	        }
	    }
	    
}
