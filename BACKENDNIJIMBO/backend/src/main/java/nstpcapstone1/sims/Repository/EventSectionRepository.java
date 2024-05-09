package nstpcapstone1.sims.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import nstpcapstone1.sims.Entity.EventSectionEntity;

public interface EventSectionRepository extends JpaRepository<EventSectionEntity, Long>{
	List<EventSectionEntity> findByEventEventID(Long eventId);
	List<EventSectionEntity> sectionId(Long id);
    List<EventSectionEntity> findBySectionId(Long sectionId);

}
