package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.enums.AreaType;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.AreaEntity;

@Repository
public interface JpaAreaRepository extends CrudRepository<AreaEntity, Long>
{
    public List<Area> findByType(AreaType type);
}