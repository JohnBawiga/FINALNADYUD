package nstpcapstone1.sims.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_admin")
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminid;

    @Column(name = "admin_id", nullable = false, unique = true)
    private String adminID;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    public AdminEntity() {

    }

    public AdminEntity(Long adminid, String adminID, String firstName, String lastName, String email,
            String password) {
        super();
        this.adminid = adminid;
        this.adminID = adminID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public Long getadminid() {
        return adminid;
    }

    public void setadminid(Long adminid) {
        this.adminid = adminid;
    }

    public String getadminID() {
        return adminID;
    }

    public void setadminID(String adminID) {
        this.adminID = adminID;
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
}
