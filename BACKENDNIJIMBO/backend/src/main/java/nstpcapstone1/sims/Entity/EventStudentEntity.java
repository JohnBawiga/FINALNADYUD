package nstpcapstone1.sims.Entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_event_student")
public class EventStudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private EventEntity event;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentEntity student;

    private boolean isRegistered;
    private Date timeIN;
    private Date timeOUT;
    public EventStudentEntity() {
    }
	public EventStudentEntity(Long id, EventEntity event, StudentEntity student, boolean isRegistered, Date timeIN,
			Date timeOUT) {
		super();
		this.id = id;
		this.event = event;
		this.student = student;
		this.isRegistered = isRegistered;
		this.timeIN = timeIN;
		this.timeOUT = timeOUT;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public EventEntity getEvent() {
		return event;
	}
	public void setEvent(EventEntity event) {
		this.event = event;
	}
	public StudentEntity getStudent() {
		return student;
	}
	public void setStudent(StudentEntity student) {
		this.student = student;
	}
	public boolean isRegistered() {
		return isRegistered;
	}
	public void setRegistered(boolean isRegistered) {
		this.isRegistered = isRegistered;
	}
	public Date getTimeIN() {
		return timeIN;
	}
	public void setTimeIN(Date timeIN) {
		this.timeIN = timeIN;
	}
	public Date getTimeOUT() {
		return timeOUT;
	}
	public void setTimeOUT(Date timeOUT) {
		this.timeOUT = timeOUT;
	}

}
