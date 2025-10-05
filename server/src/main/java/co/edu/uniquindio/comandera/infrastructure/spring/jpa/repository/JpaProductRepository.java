package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.ProductEntity;

@Repository
public interface JpaProductRepository extends CrudRepository<ProductEntity, Long>
{
    // 
}
