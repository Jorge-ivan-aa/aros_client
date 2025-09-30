package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.WorkerEntity;

@Repository
public interface JpaWorkerRepository extends CrudRepository<WorkerEntity, Long> {
    public Optional<WorkerEntity> findByEmail(String email);
}
