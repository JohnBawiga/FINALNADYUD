package nstpcapstone1.sims.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import nstpcapstone1.sims.Entity.StudentEntity;
import nstpcapstone1.sims.Entity.StudentTeacherEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.StudentRepository;
import nstpcapstone1.sims.Repository.StudentTeacherRepository;
import nstpcapstone1.sims.Repository.TeacherRepository;
import nstpcapstone1.sims.Service.StudentTeacherService;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
public class StudentTeacherController {

    private final StudentTeacherRepository studentTeacherRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final StudentTeacherService studentTeacherService;
    public StudentTeacherController(StudentTeacherRepository studentTeacherRepository, StudentRepository studentRepository,TeacherRepository teacherRepository, StudentTeacherService studentTeacherService) {
        this.studentTeacherRepository = studentTeacherRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.studentTeacherService = studentTeacherService;
    }

    @GetMapping("/teacherstudent/{studentID}")
    public ResponseEntity<List<StudentTeacherEntity>> getByStudentID(@PathVariable String studentID) {
        List<StudentTeacherEntity> studentTeachers = studentTeacherRepository.findByStudentStudentID(studentID);
        if (studentTeachers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(studentTeachers, HttpStatus.OK);
    }
    @PostMapping("/assign")
    public ResponseEntity<String> assignTeacherToStudent(@RequestParam String studentID, @RequestParam Long userid) {
        StudentEntity student = studentRepository.findByStudentID(studentID);
        TeacherEntity teacher = teacherRepository.findByUserid(userid);

        if (student == null) {
            return new ResponseEntity<>("Student not found with ID: " + studentID, HttpStatus.NOT_FOUND);
        }

        if (teacher == null) {
            return new ResponseEntity<>("Teacher not found with UserID: " + userid, HttpStatus.NOT_FOUND);
        }

        // Create StudentTeacherEntity and save it
        StudentTeacherEntity studentTeacher = new StudentTeacherEntity(student, teacher);
        studentTeacherRepository.save(studentTeacher);

        return new ResponseEntity<>("Teacher assigned to student successfully", HttpStatus.OK);
    }
    @PutMapping("/updateTeacher")
    public ResponseEntity<?> updateTeacher(@RequestParam String studentID, @RequestParam Long userid) {
        try {
            // Fetch the student-teacher entity by studentID
            StudentTeacherEntity studentTeacher = studentTeacherRepository.findByStudent_StudentID(studentID);
            
            if (studentTeacher != null) {
                // Fetch the teacher entity using the teacher ID (userid)
                TeacherEntity teacher = teacherRepository.findByUserid(userid);
                
                if (teacher != null) {
                    // Update the teacher
                    studentTeacher.setTeacher(teacher);
                    studentTeacherRepository.save(studentTeacher);
                    return ResponseEntity.ok("Teacher updated successfully.");
                } else {
                    return ResponseEntity.badRequest().body("Teacher not found with ID: " + userid);
                }
            } else {
                return ResponseEntity.badRequest().body("Student not found with ID: " + studentID);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating teacher: " + e.getMessage());
        }
    }
    @GetMapping("/byteacherid/{userid}")
    public ResponseEntity<StudentTeacherEntity> getByTeacherId(@PathVariable Long userid) {
        StudentTeacherEntity studentTeacherEntity = studentTeacherService.getByTeacherId(userid);
        if (studentTeacherEntity != null) {
            return new ResponseEntity<>(studentTeacherEntity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
