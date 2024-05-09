package nstpcapstone1.sims.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_event_section")

public class EventSectionEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	 @ManyToOne
	    @JoinColumn(name = "event_id")
	    private EventEntity event;

	    @ManyToOne
	    @JoinColumn(name = "section_id")
	    private SectionEntity section;
	    
	    public EventSectionEntity() {
	    	
	    }

		public EventSectionEntity(EventEntity event, SectionEntity section) {
			super();
			this.event = event;
			this.section = section;
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

		public SectionEntity getSection() {
			return section;
		}

		public void setSection(SectionEntity section) {
			this.section = section;
		}
	    
	    
}
