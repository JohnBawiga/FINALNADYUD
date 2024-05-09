package nstpcapstone1.sims.Controller;

import java.io.IOException;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import nstpcapstone1.sims.Entity.AnnouncementEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.TeacherRepository;
import nstpcapstone1.sims.Service.TeacherService;

@RestController
@CrossOrigin(origins="*")
public class TeacherController {
	@Autowired
	private TeacherService teacherService;
	
	
	@Autowired 
	private TeacherRepository teacherRepository;
	@GetMapping("getallteachers")
    public ResponseEntity<List<TeacherEntity>> getAllAnnouncements() {
        List<TeacherEntity> announcements = teacherService.getAllAnnouncements();
        return ResponseEntity.ok(announcements);
    }
	 @PostMapping("/signupteacher")
	    public ResponseEntity<?> signupTeacher(@RequestBody TeacherEntity teacherEntity) {
	        try {
	            // Call the service to save the teacher
	            TeacherEntity savedTeacher = teacherService.signupTeacher(teacherEntity);
	            return new ResponseEntity<>(savedTeacher, HttpStatus.CREATED);
	        } catch (Exception e) {
	            return new ResponseEntity<>("Failed to signup teacher: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 @DeleteMapping("/deleteteacher/{userid}")
	    public ResponseEntity<?> deleteTeacherByUserId(@PathVariable Long userid) {
	        // Check if the teacher exists
	        if (!teacherRepository.existsById(userid)) {
	            return ResponseEntity.notFound().build();
	        }

	        // Delete the teacher by userid
	        teacherRepository.deleteById(userid);
	        
	        return ResponseEntity.ok().build();
	    }
	 @GetMapping("/getbyUserid/{userid}")
	    public ResponseEntity<TeacherEntity> getByUserId(@PathVariable Long userid) {
	        // Check if the teacher exists
	        if (!teacherRepository.existsById(userid)) {
	            return ResponseEntity.notFound().build();
	        }

	        // If the teacher exists, retrieve and return it
	        TeacherEntity teacher = teacherRepository.findById(userid).orElse(null);
	        if (teacher != null) {
	            return ResponseEntity.ok(teacher);
	        } else {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	    }
	 @PostMapping("/createTeacher")
	 public ResponseEntity<TeacherEntity> createTeacher(
	         @RequestParam("teacherID") String teacherID,
	         @RequestParam("firstName") String firstName,
	         @RequestParam("lastName") String lastName,
	         @RequestParam("assignedYear") String assignedYear,
	         @RequestParam("email") String email,
	         @RequestParam("password") String password,
	         @RequestParam(value = "profile", required = false) MultipartFile profileImage) {

	     try {
	         // Check if teacherID or email already exists
	         if (teacherRepository.existsByTeacherID(teacherID)) {
	             return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
	         }

	         if (teacherRepository.existsByEmail(email)) {
	             return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
	         }

	         TeacherEntity teacherEntity = new TeacherEntity();
	         teacherEntity.setTeacherID(teacherID);
	         teacherEntity.setFirstName(firstName);
	         teacherEntity.setLastName(lastName);
	         teacherEntity.setAssignedYear(assignedYear);
	         teacherEntity.setEmail(email);
	         teacherEntity.setPassword(password);

	         // If profile image is provided, set it
	         if (profileImage != null && !profileImage.isEmpty()) {
	             teacherEntity.setProfile(profileImage.getBytes());
	         }

	         TeacherEntity savedTeacher = teacherRepository.save(teacherEntity);
	         return new ResponseEntity<>(savedTeacher, HttpStatus.CREATED);
	     } catch (IOException e) {
	         e.printStackTrace();
	         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	     }
	 }

	 @GetMapping("/teacherlogin")
	    public ResponseEntity<Object> findByUserid(
	            @RequestParam(name = "teacherID", required = false, defaultValue = "0") String teacherID,
	            @RequestParam(name = "password", required = false, defaultValue = "0") String password) {

	        // Assuming teacherService is the service handling TeacherEntity operations
	        TeacherEntity teacher = teacherService.findByTeacherID(teacherID);

	        if (teacher != null && teacher.getPassword().equals(password)) {
	            return ResponseEntity.ok(teacher);
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Log-in invalid");
	        }
	    }
	 @GetMapping("/getbyTeacherID/{teacherID}")
	    public ResponseEntity<TeacherEntity> getByTeacherID(@PathVariable String teacherID) {
	        TeacherEntity teacher = teacherService.findByTeacherID(teacherID);
	        if (teacher != null) {
	            return new ResponseEntity<>(teacher, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	 @GetMapping("/checkEmail/{email}")
	 public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
	     boolean exists = teacherService.emailExists(email);
	     return ResponseEntity.ok(exists);
	 }

	 @GetMapping("/checkTeacherID/{teacherID}")
	 public ResponseEntity<Boolean> checkTeacherIDExists(@PathVariable String teacherID) {
	     boolean exists = teacherService.teacherIDExists(teacherID);
	     return ResponseEntity.ok(exists);
	 }
}
