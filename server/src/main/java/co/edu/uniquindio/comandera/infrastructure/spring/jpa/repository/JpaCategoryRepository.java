package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.CategoryEntity;

@Repository
public interface JpaCategoryRepository extends CrudRepository<CategoryEntity, Long>
{
    // 
}