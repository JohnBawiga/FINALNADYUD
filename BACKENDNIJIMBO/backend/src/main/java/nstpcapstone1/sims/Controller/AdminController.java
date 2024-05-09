package nstpcapstone1.sims.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import nstpcapstone1.sims.Entity.AdminEntity;
import nstpcapstone1.sims.Service.AdminService;

@RestController
@CrossOrigin(origins="*")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/adminsignup")
    public ResponseEntity<String> signup(@RequestBody AdminEntity user) {
        // Check if the studentID already exists
        if (adminService.existsByAdminID(user.getadminID())) {
            return new ResponseEntity<>("StudentID already exists", HttpStatus.BAD_REQUEST);
        }

        // Save the user if studentID is unique
        adminService.createAdmin(user);
        return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
    }
	
	@GetMapping("/getByUseridAdmin")
    public ResponseEntity findByUserid(
            @RequestParam(name = "adminID", required = false, defaultValue = "0") String adminID,
            @RequestParam(name = "password", required = false, defaultValue = "0") String password) {

        AdminEntity user = adminService.findByStudentID(adminID);
        
        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Log-in invalid");
        }
    }
}
