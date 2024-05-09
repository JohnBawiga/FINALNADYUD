package nstpcapstone1.sims.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import nstpcapstone1.sims.Entity.EventSectionEntity;
import nstpcapstone1.sims.Entity.TeacherSectionEntity;
import nstpcapstone1.sims.Repository.TeacherSectionRepository;
import nstpcapstone1.sims.Service.TeacherSectionService;


@RestController
@CrossOrigin(origins="*")
public class TeacherSectionController {
	
	 private final TeacherSectionService teacherSectionService;
	    private final TeacherSectionRepository teacherSectionRepository;
	    
	    @Autowired
	    public TeacherSectionController(TeacherSectionService teacherSectionService, TeacherSectionRepository teacherSectionRepository) {
	        this.teacherSectionService = teacherSectionService;
	        this.teacherSectionRepository = teacherSectionRepository;
	    }
	
	    @PostMapping("/assignTeacherToSection")
	    public String assignTeacherToSection(@RequestBody TeacherSectionEntity teacherSectionEntity) {
	        try {
	            teacherSectionService.assignTeacherToSection(teacherSectionEntity);
	            return "Teacher assigned to section successfully";
	        } catch (Exception e) {
	            e.printStackTrace();
	            return "Failed to assign teacher to section";
	        }
	    }

	    @GetMapping("/getAllTeacherSections") // Changed the mapping endpoint here
	    public List<TeacherSectionEntity> getAllTeacherSections() {
	        return teacherSectionService.getAllTeacherSections();
	    }
	    @GetMapping("/teachersections/{id}")
	    public ResponseEntity<List<TeacherSectionEntity>> getBySectionId(@PathVariable Long id) {
	        List<TeacherSectionEntity> teacherSection = teacherSectionRepository.findBySectionId(id);
	        if (teacherSection.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(teacherSection, HttpStatus.OK);
	    }
	   
	   
	    
	    @GetMapping("/getbyteacherid/{teacherID}")
	    public ResponseEntity<List<TeacherSectionEntity>> getByTeacherID(@PathVariable String teacherID) {
	        List<TeacherSectionEntity> teacherSections = teacherSectionRepository.findByTeacherTeacherID	(teacherID);
	        if (teacherSections.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(teacherSections, HttpStatus.OK);
	    }
	  
	    
}
	