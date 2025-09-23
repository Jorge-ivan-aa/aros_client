package co.edu.uniquindio.comandera.repostories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.springdata.entity.WorkerEntity;

@Repository
public interface WorkerRepository extends CrudRepository<WorkerEntity, String> {
    // 
}
