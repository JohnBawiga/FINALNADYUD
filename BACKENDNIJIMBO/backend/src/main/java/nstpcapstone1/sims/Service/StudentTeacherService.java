package nstpcapstone1.sims.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import nstpcapstone1.sims.Entity.StudentTeacherEntity;
import nstpcapstone1.sims.Repository.StudentTeacherRepository;

@Service
public class StudentTeacherService {

    private final StudentTeacherRepository studentTeacherRepository;

    @Autowired
    public StudentTeacherService(StudentTeacherRepository studentTeacherRepository) {
        this.studentTeacherRepository = studentTeacherRepository;
    }

    public StudentTeacherEntity getByTeacherId(Long userid) {
        return studentTeacherRepository.findByTeacher_Userid(userid);
    }
}
