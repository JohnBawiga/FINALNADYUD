package nstpcapstone1.sims.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import nstpcapstone1.sims.Entity.EventSectionEntity;
import nstpcapstone1.sims.Repository.AdminRepository;
import nstpcapstone1.sims.Repository.EventSectionRepository;

@Service
public class EventSectionService {
	private final EventSectionRepository eventSectionRepository;

	@Autowired
	public EventSectionService(EventSectionRepository eventSectionRepository) {
	    this.eventSectionRepository = eventSectionRepository;
	}

	public void assignSectionToEvent(EventSectionEntity eventSectionEntity) {
	    eventSectionRepository.save(eventSectionEntity);
	}
}
