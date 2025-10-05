package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.Worker;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.WorkerEntity;

public class WorkerJpaMapper
{
    public static Worker toDomain(WorkerEntity entity, Set<Area> areas)
    {
        Worker model = new Worker(
            entity.getId(),
            entity.getName(),
            entity.getEmail(),
            entity.getPassword()
        );
        
        model.setIdentification(entity.getIdentification());
        model.setAddress(entity.getAddress());
        model.setImage(entity.getImage());
        model.setObservations(entity.getObservations());
        model.setPhone(entity.getPhone());
        model.setEnable(entity.getEnable());
        model.setAreas(areas);
        
        return model;
    }
    
    public static WorkerEntity toEntity(Worker worker)
    {
        WorkerEntity entity = new WorkerEntity();

        entity.setId(worker.getId());
        entity.setIdentification(worker.getIdentification());
        entity.setName(worker.getName());
        entity.setEmail(worker.getEmail());
        entity.setPassword(worker.getPasswordHash());
        entity.setAddress(worker.getAddress());
        entity.setPhone(worker.getPhone());
        entity.setEnable(worker.isEnable());
        
        return entity;
    }
}
