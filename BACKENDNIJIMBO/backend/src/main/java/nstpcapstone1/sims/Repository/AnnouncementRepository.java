package nstpcapstone1.sims.Repository;

import nstpcapstone1.sims.Entity.AnnouncementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Long> {
    // You can define custom query methods here if needed
}
