package nstpcapstone1.sims.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import nstpcapstone1.sims.Entity.EventStudentEntity;
import nstpcapstone1.sims.Entity.EventTeacherEntity;
import nstpcapstone1.sims.Repository.EventStudentRepository;
import nstpcapstone1.sims.Repository.EventTeacherRepository;

@Service
public class EventStudentService {

    private final EventStudentRepository eventStudentRepository;

    @Autowired
    public EventStudentService(EventStudentRepository eventStudentRepository) {
        this.eventStudentRepository = eventStudentRepository;
    }

    public void assignStudentToEvent(EventStudentEntity eventStudentEntity) {
        eventStudentRepository.save(eventStudentEntity);
    }
    public void save(EventStudentEntity eventStudentEntity) {
        eventStudentRepository.save(eventStudentEntity);
    }
    public EventStudentEntity findById(Long id) {
        Optional<EventStudentEntity> eventStudentOptional = eventStudentRepository.findById(id);
        return eventStudentOptional.orElse(null);
    }
    public EventStudentEntity createEventStudent(EventStudentEntity eventStudentEntity) {
        // Here you can perform any business logic/validation before saving to the database
        // For simplicity, we'll directly call the repository to save the entity
        return eventStudentRepository.save(eventStudentEntity);
    }
    
    public EventStudentEntity findByEventIdAndStudentId(Long eventId, Long studentId) {
        Optional<EventStudentEntity> eventStudentOptional = eventStudentRepository.findByEventEventIDAndStudentUserid(eventId, studentId);
        return eventStudentOptional.orElse(null);
    }

   

	
}
