package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.AreaEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.ProductEntity;

@Repository
public interface JpaProductRepository extends CrudRepository<ProductEntity, Long> {

    // List<AreaEntity> findByType(String type);

}