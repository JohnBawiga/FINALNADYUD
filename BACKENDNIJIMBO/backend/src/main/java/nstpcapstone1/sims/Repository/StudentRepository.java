package nstpcapstone1.sims.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nstpcapstone1.sims.Entity.StudentEntity;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long>{
	boolean existsByStudentID(String studentID);
	StudentEntity findByStudentID(String studentID);
    StudentEntity getByStudentID(String studentID);
    boolean existsByEmail(String email);
    List<StudentEntity> findBySection(int section);

}
