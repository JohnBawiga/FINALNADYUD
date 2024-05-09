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
@Table(name = "tbl_teacher")
public class TeacherEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userid;

    @Column(name = "teacher_id", nullable = false, unique = true)
    private String teacherID;

    private String firstName;
    private String lastName;
    private String assignedYear;
    private String email;
    private String password;
    @Lob
    @Column(nullable = true, columnDefinition = "LONGBLOB")

    private byte[] profile; // Store the image as byte[]
    
    @OneToMany(mappedBy = "teacher")
    private Set<EventTeacherEntity> eventTeachers = new HashSet<>();
    
    @OneToMany(mappedBy = "teacher")
    private Set<StudentTeacherEntity> studentTeachers = new HashSet<>();

    public TeacherEntity() {
    	
    }
	public TeacherEntity(Long userid, String teacherID, String firstName, String lastName, String assignedYear,
			String email, String password, byte[] profile) {
		super();
		this.userid = userid;
		this.teacherID = teacherID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.assignedYear = assignedYear;
		this.email = email;
		this.password = password;
		this.profile = profile;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public String getTeacherID() {
		return teacherID;
	}

	public void setTeacherID(String teacherID) {
		this.teacherID = teacherID;
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

	public String getAssignedYear() {
		return assignedYear;
	}

	public void setAssignedYear(String assignedYear) {
		this.assignedYear = assignedYear;
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
		this.profile = profile;
	}

	
    
}