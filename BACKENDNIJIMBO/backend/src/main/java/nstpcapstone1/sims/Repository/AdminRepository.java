package nstpcapstone1.sims.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nstpcapstone1.sims.Entity.AdminEntity;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Long>{
	boolean existsByAdminID(String adminID);
	AdminEntity findByAdminID(String adminID);

}
