package nstpcapstone1.sims.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nstpcapstone1.sims.Entity.StudentEntity;
import nstpcapstone1.sims.Entity.StudentTeacherEntity;

import java.util.List;

@Repository
public interface StudentTeacherRepository extends JpaRepository<StudentTeacherEntity, Long> {
    List<StudentTeacherEntity> findByStudentStudentID(String studentID);
    StudentTeacherEntity findByStudent_StudentID(String studentID);
    StudentTeacherEntity findByTeacher_Userid(Long userid);


}

