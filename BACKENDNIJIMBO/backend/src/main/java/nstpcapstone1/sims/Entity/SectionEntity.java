	package nstpcapstone1.sims.Entity;
	
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.Table;
	
	@Entity
	@Table(name = "tbl_section")
	public class SectionEntity {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    private String sectionName;
	
		public SectionEntity() {
			super();
			// TODO Auto-generated constructor stub
		}
	
		public SectionEntity(Long id, String sectionName) {
			super();
			this.id = id;
			this.sectionName = sectionName;
		}
	
		public Long getId() {
			return id;
		}
	
		public void setId(Long id) {
			this.id = id;
		}
	
		public String getSectionName() {
			return sectionName;
		}
	
		public void setSectionName(String sectionName) {
			this.sectionName = sectionName;
		}
	
	}
