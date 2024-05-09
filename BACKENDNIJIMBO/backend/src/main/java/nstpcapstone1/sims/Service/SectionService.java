package nstpcapstone1.sims.Service;

import nstpcapstone1.sims.Entity.SectionEntity;
import nstpcapstone1.sims.Repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    public List<SectionEntity> getAllSections() {
        return sectionRepository.findAll();
    }

    public SectionEntity createSection(SectionEntity section) {
        return sectionRepository.save(section);
    }
}
