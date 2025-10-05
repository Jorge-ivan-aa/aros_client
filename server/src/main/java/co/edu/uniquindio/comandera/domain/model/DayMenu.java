package co.edu.uniquindio.comandera.domain.model;

import java.time.LocalDateTime;
import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.enums.ProductStatus;

public class DayMenu extends Product
{
    private Set<Product> products;

    private LocalDateTime creation;

    public DayMenu() {}

    public DayMenu(
        Long id,
        String name,
        String description,
        Integer estimatedTime,
        Area preparationArea,
        ProductStatus preparationStatus,
        LocalDateTime prepararationDate,
        Set<Category> categories,
        Set<Product> products
    ) {
        super(
            id,
            name,
            description,
            estimatedTime,
            preparationArea,
            preparationStatus,
            prepararationDate,
            categories
        );

        this.products = products;
    }

    public Set<Product> getProducts()
    {
        return products;
    }

    public void setProducts(Set<Product> products)
    {
        this.products = products;
    }

    public LocalDateTime getCreation()
    {
        return creation;
    }

    public void setCreation(LocalDateTime creation)
    {
        this.creation = creation;
    }
}
