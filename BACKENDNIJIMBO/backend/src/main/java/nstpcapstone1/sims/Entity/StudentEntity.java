package nstpcapstone1.sims.Entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_user")
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userid;

    @Column(name = "student_id", nullable = false, unique = true)
    private String studentID;

    private String firstName;
    private String lastName;
    private String course;
    private String email;
    private String password;
    @Lob
    @Column(nullable = true, columnDefinition = "LONGBLOB")

    private byte[] profile; // Store the image as byte[]
    @Column(nullable = true)
    private int section;
    @OneToMany(mappedBy = "student")
    private Set<EventStudentEntity> eventStudents = new HashSet<>();
    
    @OneToMany(mappedBy = "student")
    private Set<StudentTeacherEntity> studentTeachers = new HashSet<>();
    
    @OneToMany(mappedBy = "student")
    private Set<StudentSectionEntity> studentSection = new HashSet<>();
    public StudentEntity() {

    }

    public StudentEntity(Long userid, String studentID, String firstName, String lastName, String course, String email,
            String password, byte[] profile, int section) {
super();
this.userid = userid;
this.studentID = studentID;
this.firstName = firstName;
this.lastName = lastName;
this.course = course;
this.email = email;
this.password = password;
this.profile = profile;
this.section = section; // Set the provided section, which could be null
}

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public byte[] getProfile() {
    	return profile;
    }
    public void setProfile(byte[] profile) {
    	this.profile=profile;
    }
    
    public void setSection(int section) {
    	this.section=section;
    	
    }
    public int getSection() {
    	return section;
    }
}
