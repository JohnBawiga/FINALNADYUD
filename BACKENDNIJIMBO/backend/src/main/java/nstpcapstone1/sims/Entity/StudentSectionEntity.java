package nstpcapstone1.sims.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_student_section")
public class StudentSectionEntity {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	 
	 	@ManyToOne
	    @JoinColumn(name = "section_id")
	    private SectionEntity section;

	    @ManyToOne
	    @JoinColumn(name = "student_id")
	    private StudentEntity student;
	    
	    public StudentSectionEntity() {
	    	
	    }

		public StudentSectionEntity( SectionEntity section, StudentEntity student) {
			this.section = section;
			this.student = student;
		}

		public SectionEntity getSection() {
			return section;
		}

		public void setSection(SectionEntity section) {
			this.section = section;
		}

		public StudentEntity getStudent() {
			return student;
		}

		public void setStudent(StudentEntity student) {
			this.student = student;
		}
	    
}
