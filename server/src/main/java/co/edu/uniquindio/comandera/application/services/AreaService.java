package co.edu.uniquindio.comandera.application.services;

import co.edu.uniquindio.comandera.api.dto.AreaDTO;
import co.edu.uniquindio.comandera.infrastructure.springdata.entity.AreaEntity;
import co.edu.uniquindio.comandera.infrastructure.springdata.entity.ProductEntity;
import co.edu.uniquindio.comandera.infrastructure.springdata.entity.WorkerEntity;
import co.edu.uniquindio.comandera.repostories.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AreaService {

    @Autowired
    private AreaRepository repository;

    public AreaDTO create(AreaDTO areaDTO){
        AreaEntity entity = toEntity(areaDTO);
        AreaEntity saved = repository.save(entity);
        return toDTO(saved);
    }

    public AreaDTO findById(Long id){
        AreaEntity entity = repository.findById(id)
                .orElseThrow(() ->  new RuntimeException("area no encontradad: "+ id));
        return toDTO(entity);
    }

    public List<AreaDTO> getAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .map(this::toDTO)
                .toList();
    }

    public static AreaEntity toEntity(AreaDTO dto) {
        AreaEntity entity = new AreaEntity();
        entity.setName(dto.name());
        entity.setType(dto.type());
        return entity;
    }

    public AreaDTO toDTO(AreaEntity entity) {
        Set<Long> productIds = entity.getProducts()
                .stream()
                .map(ProductEntity::getId)
                .collect(Collectors.toSet());

        Set<Long> workerIds = entity.getWorkers()
                .stream()
                .map(WorkerEntity::getId)
                .collect(Collectors.toSet());

        return new AreaDTO(
                entity.getId(),
                entity.getName(),
                entity.getType(),
                productIds,
                workerIds
        );
    }
}
