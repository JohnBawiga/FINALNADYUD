package nstpcapstone1.sims.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import nstpcapstone1.sims.Entity.EventTeacherEntity;
import nstpcapstone1.sims.Repository.EventTeacherRepository;

@Service
public class EventTeacherService {

    private final EventTeacherRepository eventTeacherRepository;

    @Autowired
    public EventTeacherService(EventTeacherRepository eventTeacherRepository) {
        this.eventTeacherRepository = eventTeacherRepository;
    }

    public void assignTeacherToEvent(EventTeacherEntity eventTeacherEntity) {
        eventTeacherRepository.save(eventTeacherEntity);
    }
    
}
