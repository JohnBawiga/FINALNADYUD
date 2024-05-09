package nstpcapstone1.sims.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "tbl_announcement")

public class AnnouncementEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long announcementID;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Date date;

    @Lob
    @Column(nullable = true, columnDefinition = "LONGBLOB")

    private byte[] image; // Store the image as byte[]

    private Long adminID;

    // Constructors, getters, and setters
    // Constructors, getters, and setters
    // Constructors, getters, and setters

    // Default constructor
    public AnnouncementEntity() {
    }

    // Parameterized constructor
    public AnnouncementEntity(String title, String description, Date date, byte[] image, Long adminID) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.image = image;
        this.adminID = adminID;
    }

    // Getters and setters

    public Long getAnnouncementID() {
        return announcementID;
    }

    public void setAnnouncementID(Long announcementID) {
        this.announcementID = announcementID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Long getAdminID() {
        return adminID;
    }

    public void setAdminID(Long adminID) {
        this.adminID = adminID;
    }
}
