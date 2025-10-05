package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.AreaEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.ProductEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.WorkerEntity;

public class AreaJpaMapper
{
    public static Area toDomain(AreaEntity entity)
    {
        Area area = new Area();

        area.setId(entity.getId());
        area.setName(entity.getName());
        area.setType(entity.getType());

        return area;
    }

    public static AreaEntity toEntity(
        Area domain,
        Set<ProductEntity> products,
        Set<WorkerEntity> workers
    ) {
        AreaEntity entity = new AreaEntity();

        entity.setId(domain.getId());
        entity.setName(domain.getName());
        entity.setType(domain.getType());
        entity.setProducts(products);
        entity.setWorkers(workers);

        return entity;
    }
}