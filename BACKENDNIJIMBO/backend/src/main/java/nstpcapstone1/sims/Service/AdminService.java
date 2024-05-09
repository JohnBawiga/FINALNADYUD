package nstpcapstone1.sims.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import nstpcapstone1.sims.Entity.AdminEntity;
import nstpcapstone1.sims.Repository.AdminRepository;

@Service

public class AdminService {
	
	@Autowired
	private AdminRepository adminRepository;
	public void createAdmin(AdminEntity adminEntity) {
        adminRepository.save(adminEntity);
    }
    public boolean existsByAdminID(String adminID) {
        return adminRepository.existsByAdminID(adminID);
    }
    public AdminEntity findByStudentID(String adminID) {
        if (adminRepository.findByAdminID(adminID) != null)
            return adminRepository.findByAdminID(adminID);
        else
            return null;
    }
}
