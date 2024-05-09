package nstpcapstone1.sims.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import nstpcapstone1.sims.Entity.AnnouncementEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.AnnouncementRepository;
import nstpcapstone1.sims.Repository.TeacherRepository;

@Service

public class TeacherService {
	  private final TeacherRepository teacherRepository;

	    @Autowired
	    public TeacherService(TeacherRepository teacherRepository) {
	        this.teacherRepository = teacherRepository;
	    }


	    public List<TeacherEntity> getAllAnnouncements() {
	        return teacherRepository.findAll();
	    }
	   
	    public TeacherEntity signupTeacher(TeacherEntity teacherEntity) {
	    	if (teacherRepository.existsByEmail(teacherEntity.getEmail())) {
	            throw new RuntimeException("Email is already registered");
	        }

	        // Check if teacher ID is unique
	        if (teacherRepository.existsByTeacherID(teacherEntity.getTeacherID())) {
	            throw new RuntimeException("Teacher ID is already registered");
	        }
	        
	        return teacherRepository.save(teacherEntity);
	    }
	    public TeacherEntity findByTeacherID(String teacherID) {
	        return teacherRepository.findByTeacherID(teacherID);
	    }
	    public boolean emailExists(String email) {
	        return teacherRepository.existsByEmail(email);
	    }
	    public boolean teacherIDExists(String teacherID) {
	        return teacherRepository.existsByTeacherID(teacherID);
	    }

    
}
