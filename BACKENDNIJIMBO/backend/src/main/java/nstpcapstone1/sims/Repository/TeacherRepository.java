package nstpcapstone1.sims.Repository;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nstpcapstone1.sims.Entity.StudentEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;

@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity, Long> {
	TeacherEntity findByUserid(Long userid);
	 boolean existsByEmail(String email);
	 boolean existsByTeacherID(String teacherID);
	 TeacherEntity findByTeacherID(String teacherID);
}