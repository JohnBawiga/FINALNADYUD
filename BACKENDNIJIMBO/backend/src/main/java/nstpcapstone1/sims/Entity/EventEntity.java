package nstpcapstone1.sims.Entity;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_event")
public class EventEntity {
	  	
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "event_id", nullable = false, unique = true)
		private Long eventID;
		
	    private String eventTitle;
	    private Date eventStart;
	    private Date eventEnd;
	    
	    @OneToMany(mappedBy = "event")
	    private Set<EventTeacherEntity> eventTeachers = new HashSet<>();
	    
	    @Lob
	    @Column(nullable = true, columnDefinition = "LONGBLOB")

	    private byte[] image; // Store the image as byte[]
	    private String description;

	    
	    
		public EventEntity() {
			super();
			
		}
		public EventEntity(String eventTitle, Date eventStart, Date eventEnd, byte[] image,
				String description) {
			super();
			this.eventTitle = eventTitle;
			this.eventStart = eventStart;
			this.eventEnd = eventEnd;
			this.image = image;
			this.description = description;
		}
		public String getEventTitle() {
			return eventTitle;
		}
		public void setEventTitle(String eventTitle) {
			this.eventTitle = eventTitle;
		}
		
		public Date getEventStart() {
			return eventStart;
		}
		public void setEventStart(Date eventStart) {
			this.eventStart = eventStart;
		}
		public Date getEventEnd() {
			return eventEnd;
		}
		public void setEventEnd(Date eventEnd) {
			this.eventEnd = eventEnd;
		}
		public byte[] getImage() {
			return image;
		}
		public void setImage(byte[] image) {
			this.image = image;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		 public Long getEventID() { // Define getter for eventID
		        return eventID;
		    }
		

}
