package nstpcapstone1.sims.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import nstpcapstone1.sims.Entity.StudentSectionEntity;
import nstpcapstone1.sims.Entity.TeacherSectionEntity;
import nstpcapstone1.sims.Repository.StudentSectionRepository;
import nstpcapstone1.sims.Service.StudentSectionService;

@RestController
@CrossOrigin(origins="*")
public class StudentSectionController {
	
	private final StudentSectionService studentSectionService;
	private final StudentSectionRepository studentSectionRepository;

	@Autowired
	public StudentSectionController(StudentSectionService studentSectionService, StudentSectionRepository studentSectionRepository) {
	    this.studentSectionService = studentSectionService;
	    this.studentSectionRepository = studentSectionRepository;
	}

	@PostMapping("/assignStudentToSection")
	public String assignStudentToSection(@RequestBody StudentSectionEntity studentSectionEntity) {
	    try {
	        studentSectionService.assignStudentToSection(studentSectionEntity);
	        return "Student assigned to section successfully";
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "Failed to assign student to section";
	    }
	}
	@GetMapping("/getAllStudentSections") // Changed the mapping endpoint here
    public List<StudentSectionEntity> getAllStudentSections() {
        return studentSectionService.getAllStudentSections();
    }
	
	@GetMapping("/studentsection/{userid}")
	    public ResponseEntity<List<StudentSectionEntity>> getByUserId(@PathVariable Long userid) {
	        List<StudentSectionEntity> studentSection = studentSectionRepository.findByStudentUserid(userid);
	        if (studentSection.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(studentSection, HttpStatus.OK);
	    }
	@GetMapping("/sections/{id}")
    public ResponseEntity<List<StudentSectionEntity>> getBySectionId(@PathVariable Long id) {
        List<StudentSectionEntity> studentSection = studentSectionRepository.findBySectionId(id);
        if (studentSection.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(studentSection, HttpStatus.OK);
    }
	@GetMapping("/sectionstudents/{studentID}")
    public ResponseEntity<List<StudentSectionEntity>> getByStudentID(@PathVariable String studentID) {
        List<StudentSectionEntity> studentSection = studentSectionRepository.findByStudentStudentID(studentID);
        if (studentSection.isEmpty()) {	
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(studentSection, HttpStatus.OK);
    }
	
}
