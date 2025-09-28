package co.edu.uniquindio.comandera.repostories;

import org.apache.juli.logging.Log;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.springdata.entity.WorkerEntity;

import java.util.Optional;

@Repository
public interface WorkerRepository extends CrudRepository<WorkerEntity, Long> {

    boolean existsByIdentification(String identification);
    Optional<WorkerEntity> findByIdentification(String identification);


}
