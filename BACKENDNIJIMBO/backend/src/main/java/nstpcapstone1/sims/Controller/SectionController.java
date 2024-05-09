package nstpcapstone1.sims.Controller;

import nstpcapstone1.sims.Entity.SectionEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.SectionRepository;
import nstpcapstone1.sims.Service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins="*")
public class SectionController {

    private final SectionService sectionService;
    private final SectionRepository sectionRepository;
    @Autowired
    public SectionController(SectionService sectionService, SectionRepository sectionRepository) {
        this.sectionService = sectionService;
        this.sectionRepository = sectionRepository;
    }

    @GetMapping("/getAllSections")
    public ResponseEntity<List<SectionEntity>> getAllSections() {
        List<SectionEntity> sections = sectionService.getAllSections();
        return new ResponseEntity<>(sections, HttpStatus.OK);
    }

    @PostMapping("/createSection")
    public ResponseEntity<SectionEntity> createSection(@RequestBody SectionEntity section) {
        SectionEntity createdSection = sectionService.createSection(section);
        return new ResponseEntity<>(createdSection, HttpStatus.CREATED);
    }
    
    @GetMapping("/getbySectionid/{id}")
    public ResponseEntity<SectionEntity> getSectionById(@PathVariable Long id) {
        Optional<SectionEntity> sectionOptional = sectionRepository.findById(id);
        if (sectionOptional.isPresent()) {
            SectionEntity section = sectionOptional.get();
            return new ResponseEntity<>(section, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
