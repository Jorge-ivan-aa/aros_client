package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.WorkerEntity;

import java.util.Optional;

@Repository
public interface JpaWorkerRepository extends CrudRepository<WorkerEntity, Long> {

    boolean existsByIdentification(String identification);
    Optional<WorkerEntity> findByIdentification(String identification);
    void deleteByIdentification(String identification);

    Optional<WorkerEntity> findByEmail(String email);
}
