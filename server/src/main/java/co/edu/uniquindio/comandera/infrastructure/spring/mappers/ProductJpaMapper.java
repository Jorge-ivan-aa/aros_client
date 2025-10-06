package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import co.edu.uniquindio.comandera.domain.model.Product;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.AreaEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.CategoryEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.ProductEntity;
import java.util.Set;


public class ProductJpaMapper {

    public static Product toDomain(ProductEntity entity) {
        if (entity == null) return null;

//        return new Product(
//            entity.getId() == null ? null : entity.getId().intValue(),
//            entity.getName(),
//            entity.getDescription(),
//            entity.getEstimateTime(),
//            entity.getPreparationArea() != null ? entity.getPreparationArea().getType() : null,
//                entity.getStatus() != null ? entity.getStatus(): ProductStatus.COMPLETED,
//            entity.getPrepararationDate(),
//            entity.getImage(),
//            new HashSet<>()
//        );
        return null;
    }

    public static ProductEntity toEntity(Product product) {
        if (product == null) return null;

        ProductEntity entity = new ProductEntity();
        if (product.getId() != null) entity.setId(product.getId());
        entity.setName(product.getName());
        entity.setDescription(product.getDescription());
        entity.setEstimateTime(product.getEstimatedTime());
        entity.setStatus(product.getPreparationStatus());
        entity.setPrepararationDate(product.getPrepararationDate());
        entity.setImage(product.getImage());

        return entity;
    }

    public static Object toEntity(Product product, AreaEntity entity, Set<CategoryEntity> categories) {
        return null;
    }
}