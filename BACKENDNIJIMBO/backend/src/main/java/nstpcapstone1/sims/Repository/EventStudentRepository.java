package nstpcapstone1.sims.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import nstpcapstone1.sims.Entity.EventStudentEntity;
import nstpcapstone1.sims.Entity.EventTeacherEntity;

import java.util.List;

public interface EventStudentRepository extends JpaRepository<EventStudentEntity, Long> {
    List<EventStudentEntity> findByEventEventID(Long eventId);
    List<EventStudentEntity> findByStudentUserid(Long userid);
    Optional<EventStudentEntity> findByEventEventIDAndStudentUserid(Long eventId, Long studentId);
    List<EventStudentEntity> findByStudentUseridAndEventEventID(Long userid, Long eventID);


}