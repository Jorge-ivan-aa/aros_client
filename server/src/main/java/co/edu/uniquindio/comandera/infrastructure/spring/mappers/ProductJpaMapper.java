package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.Category;
import co.edu.uniquindio.comandera.domain.model.Product;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.AreaEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.CategoryEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.ProductEntity;

public class ProductJpaMapper
{
    public static Product toDomain(
        ProductEntity entity,
        Area preparationArea,
        Set<Category> categories
    ) {
        Product domain = new Product();

        domain.setId(entity.getId());
        domain.setName(entity.getName());
        domain.setPrice(entity.getPrice());
        domain.setDescription(entity.getDescription());
        domain.setEstimatedTime(entity.getEstimateTime());
        domain.setPreparationArea(preparationArea);
        domain.setCategories(categories);

        return domain;
    }

    public static ProductEntity toEntity(
        Product domain,
        AreaEntity preparationArea,
        Set<CategoryEntity> categories
    ) {
        ProductEntity entity = new ProductEntity();

        entity.setId(domain.getId());
        entity.setName(domain.getName());
        entity.setPrice(domain.getPrice());
        entity.setDescription(domain.getDescription());
        entity.setEstimateTime(domain.getEstimatedTime());
        entity.setPreparationArea(preparationArea);
        entity.setCategories(categories);

        return entity;
    }
}