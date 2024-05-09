package nstpcapstone1.sims.Controller;

import java.io.IOException;
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
import org.springframework.web.multipart.MultipartFile;

import nstpcapstone1.sims.Entity.StudentEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.StudentRepository;
import nstpcapstone1.sims.Service.StudentService;

@RestController
@CrossOrigin(origins="*")
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	
	@Autowired
	private StudentRepository studentRepository;
	@PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody StudentEntity user) {
        // Check if the studentID already exists
        if (studentService.existsByStudentID(user.getStudentID())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("StudentID already exists");
        }

        // Check if the email already exists
        if (studentService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        // Save the user if studentID is unique
        studentService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }
	
	@GetMapping("/getByUserid")
    public ResponseEntity findByUserid(
            @RequestParam(name = "studentID", required = false, defaultValue = "0") String studentID,
            @RequestParam(name = "password", required = false, defaultValue = "0") String password) {

        StudentEntity user = studentService.findByStudentID(studentID);

        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Log-in invalid");
        }
    }
	   @GetMapping("/getByStudentID/{studentID}")
	    public ResponseEntity<StudentEntity> getStudentByStudentID(@PathVariable String studentID) {
	        StudentEntity student = studentRepository.getByStudentID(studentID);
	        if (student != null) {
	            return new ResponseEntity<>(student, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	   @GetMapping("/getAllStudents")
	    public List<StudentEntity> getAllStudents() {
	        return studentService.getAllStudents();
	    }
	   @PutMapping("/addpicture/{studentID}")
	   public ResponseEntity<String> updateProfilePicture(
	           @PathVariable("studentID") String studentID,
	           @RequestParam("profile") MultipartFile profile) {

	       try {
	           byte[] profilePictureBytes = profile.getBytes(); // Convert MultipartFile to byte[]
	           boolean updated = studentService.updateProfilePicture(studentID, profilePictureBytes);
	           if (updated) {
	               return ResponseEntity.ok("Profile picture updated successfully");
	           } else {
	               return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
	           }
	       } catch (IOException e) {
	           e.printStackTrace();
	           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing profile picture");
	       }
	   }
	   @PutMapping("/students/{studentID}/section")
	    public ResponseEntity<String> updateStudentSection(@PathVariable String studentID, @RequestParam int section) {
	        boolean success = studentService.updateStudentSection(studentID, section);
	        if (success) {
	            return ResponseEntity.ok("Section updated successfully.");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student with ID " + studentID + " not found.");
	        }
	    }
	   @GetMapping("/students/section/{section}")
	    public ResponseEntity<List<StudentEntity>> getBySection(@PathVariable int section) {
	        try {
	            List<StudentEntity> students = studentRepository.findBySection(section);
	            if (students.isEmpty()) {
	                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	            }
	            return new ResponseEntity<>(students, HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 
}
