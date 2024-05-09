package nstpcapstone1.sims.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nstpcapstone1.sims.Entity.EventStudentEntity;
import nstpcapstone1.sims.Entity.EventTeacherEntity;
import nstpcapstone1.sims.Entity.StudentSectionEntity;
import nstpcapstone1.sims.Entity.StudentTeacherEntity;
import nstpcapstone1.sims.Entity.TeacherSectionEntity;

@Repository
public interface StudentSectionRepository extends JpaRepository<StudentSectionEntity, Long> {
    List<StudentSectionEntity> findByStudentUserid(Long userid);
    List<StudentSectionEntity> findBySectionId(Long id);
    List<StudentSectionEntity> findByStudentStudentID(String studentID);
}