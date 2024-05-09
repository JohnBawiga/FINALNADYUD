package nstpcapstone1.sims.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nstpcapstone1.sims.Entity.EventSectionEntity;
import nstpcapstone1.sims.Entity.EventTeacherEntity;
import nstpcapstone1.sims.Entity.StudentSectionEntity;
import nstpcapstone1.sims.Entity.TeacherSectionEntity;

@Repository
public interface TeacherSectionRepository extends JpaRepository<TeacherSectionEntity, Long> {
    List<TeacherSectionEntity> findBySectionId(Long id);
    List<TeacherSectionEntity> findByTeacherTeacherID(String teacherID);
}