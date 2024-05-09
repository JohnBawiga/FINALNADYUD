package nstpcapstone1.sims.Repository;

import nstpcapstone1.sims.Entity.SectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends JpaRepository<SectionEntity, Long> {
    // You can define custom query methods here if needed
}
