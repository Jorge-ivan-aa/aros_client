package co.edu.uniquindio.comandera.domain.model;

import java.time.LocalDateTime;
import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.enums.ProductStatus;

public class Product
{
    private Long id;

    private String name;

    private String description;

    private Float price;

    private Integer estimatedTime;

    private Area preparationArea;

    private ProductStatus preparationStatus;

    private LocalDateTime prepararationDate;

    private String image;

    private Set<Category> categories;

    private Integer quantity;

    public Product() {}

    public Product(
        Long id,
        String name,
        String description,
        Integer estimatedTime,
        Area preparationArea,
        ProductStatus preparationStatus,
        LocalDateTime prepararationDate,
        Set<Category> categories
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.estimatedTime = estimatedTime;
        this.preparationArea = preparationArea;
        this.preparationStatus = preparationStatus;
        this.prepararationDate = prepararationDate;
        this.categories = categories;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public Integer getEstimatedTime()
    {
        return estimatedTime;
    }

    public void setEstimatedTime(Integer estimatedTime)
    {
        this.estimatedTime = estimatedTime;
    }

    public Area getPreparationArea()
    {
        return preparationArea;
    }

    public void setPreparationArea(Area preparationArea)
    {
        this.preparationArea = preparationArea;
    }

    public ProductStatus getPreparationStatus()
    {
        return preparationStatus;
    }

    public void setPreparationStatus(ProductStatus preparationStatus)
    {
        this.preparationStatus = preparationStatus;
    }

    public LocalDateTime getPrepararationDate()
    {
        return prepararationDate;
    }

    public void setPrepararationDate(LocalDateTime prepararationDate)
    {
        this.prepararationDate = prepararationDate;
    }

    public String getImage()
    {
        return image;
    }

    public void setImage(String image)
    {
        this.image = image;
    }

    public Set<Category> getCategories()
    {
        return categories;
    }

    public void setCategories(Set<Category> categories)
    {
        this.categories = categories;
    }

    public Integer getQuantity()
    {
        return quantity;
    }

    public void setQuantity(Integer quantity)
    {
        this.quantity = quantity;
    }

    public Float getPrice()
    {
        return price;
    }

    public void setPrice(Float price)
    {
        this.price = price;
    }
}