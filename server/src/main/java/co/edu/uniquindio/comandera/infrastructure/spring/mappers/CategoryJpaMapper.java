package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.Category;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.CategoryEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.ProductEntity;

public class CategoryJpaMapper
{
    public static Category toDomain(CategoryEntity entity)
    {
        return new Category(
            entity.getId(),
            entity.getName()
        );
    }

    public static CategoryEntity toEntity(
        Category domain,
        Set<ProductEntity> products
    ) {
        CategoryEntity entity = new CategoryEntity();

        entity.setId(domain.id());
        entity.setName(domain.name());
        entity.setProducts(products);

        return entity;
    }
}