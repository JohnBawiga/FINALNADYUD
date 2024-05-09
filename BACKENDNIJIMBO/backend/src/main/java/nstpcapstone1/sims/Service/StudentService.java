package nstpcapstone1.sims.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import nstpcapstone1.sims.Entity.StudentEntity;
import nstpcapstone1.sims.Repository.StudentRepository;

@Service

public class StudentService {
	
	@Autowired
	private StudentRepository studentRepository;
	public void createUser(StudentEntity studentEntity) {
        studentRepository.save(studentEntity);
    }
    public boolean existsByStudentID(String studentID) {
        return studentRepository.existsByStudentID(studentID);
    }
    public StudentEntity findByStudentID(String studentID) {
        if (studentRepository.findByStudentID(studentID) != null)
            return studentRepository.findByStudentID(studentID);
        else
            return null;
    }
    public boolean existsByEmail(String email) {
        return studentRepository.existsByEmail(email);
    }
    public List<StudentEntity> getAllStudents() {
        return studentRepository.findAll();
    }
    public boolean updateProfilePicture(String studentID, byte[] profilePicture) {
        StudentEntity student = studentRepository.findByStudentID(studentID);
        if (student != null) {
            student.setProfile(profilePicture);
            studentRepository.save(student);
            return true;
        }
        return false;
    }
    @Transactional
    public boolean updateStudentSection(String studentID, int section) {
        // Find the student by their studentID
        StudentEntity student = studentRepository.findByStudentID(studentID);

        if (student != null) {
            // Update the section
            student.setSection(section);
            studentRepository.save(student);
            return true; // Return true indicating success
        } else {
            return false; // Return false indicating student not found
        }
    }
}
