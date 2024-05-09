package nstpcapstone1.sims.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import nstpcapstone1.sims.Entity.EventTeacherEntity;

import java.util.List;

public interface EventTeacherRepository extends JpaRepository<EventTeacherEntity, Long> {
    List<EventTeacherEntity> findByEventEventID(Long eventId);
    List<EventTeacherEntity> findByTeacherUserid(Long userid);

}