package co.edu.uniquindio.comandera.domain.model;

import java.time.LocalDateTime;
import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.enums.Area;
import co.edu.uniquindio.comandera.domain.model.enums.ProductStatus;

public record Product(
    Integer id,
    String name,
    String description,
    Integer estimatedTime,
    Area preparationArea,
    Boolean isFromDayMenu,
    ProductStatus status,
    LocalDateTime prepararationDate,
    String image,
    Set<Category> categories
) {
}
