package co.edu.uniquindio.comandera.infrastructure.spring.repositories;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.model.Worker;
import co.edu.uniquindio.comandera.domain.repository.WorkerRespository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.WorkerEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaWorkerRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.AreaJpaMapper;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.WorkerJpaMapper;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class WorkerJpaAdapter implements WorkerRespository
{
    @Autowired
    private JpaWorkerRepository internal;
    
    @Override
    public Worker create(Worker worker)
    {
        return WorkerJpaMapper.toDomain(this.internal.save(
            WorkerJpaMapper.toEntity(worker)
        ), null);
    }
    
    @Override
    public void deleteById(Integer id) {
        // TODO Auto-generated method stub
    }
    
    @Override
    public List<Worker> findAll() {
        // TODO Auto-generated method stub
        return null;
    }
    
    @Override
    public Optional<Worker> findById(Integer id) {
        // TODO Auto-generated method stub
        return Optional.empty();
    }
    
    @Override
    public Optional<Worker> findByIdentification(String identification) {
        // TODO Auto-generated method stub
        return Optional.empty();
    }
    
    @Override
    public Optional<Worker> findByEmail(String email) {
        Optional<WorkerEntity> entity = this.internal.findByEmail(email);

        if (entity.isEmpty()) return Optional.empty();

        Worker domain = WorkerJpaMapper.toDomain(entity.get(), new HashSet<>(
            entity.get().getAreas().stream().map(AreaJpaMapper::toDomain).toList()
        ));

        return Optional.of(domain);
    }

    @Override
    public Worker update(Worker worker) {
        // TODO Auto-generated method stub
        return null;
    }
}
