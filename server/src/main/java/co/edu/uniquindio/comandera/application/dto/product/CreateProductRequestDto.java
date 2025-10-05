package co.edu.uniquindio.comandera.application.dto.product;

import java.util.Set;

/**
 * request to create a normal product
 */
public class CreateProductRequestDto
{
    private String name;

    private String description;

    private Float price;

    /**
     * estimate preparation time on minutes
     */
    private Integer estimateTime;

    private Long areaId;

    private Set<Long> categoriesId;

    public CreateProductRequestDto() {
    }

    public CreateProductRequestDto(
        String name,
        String description,
        Float price,
        Integer estimateTime,
        Long areaId,
        Set<Long> categoriesId
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.estimateTime = estimateTime;
        this.areaId = areaId;
        this.categoriesId = categoriesId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getEstimateTime() {
        return estimateTime;
    }

    public void setEstimateTime(Integer estimateTime) {
        this.estimateTime = estimateTime;
    }

    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    public Set<Long> getCategoriesId() {
        return categoriesId;
    }

    public void setCategoriesId(Set<Long> categoriesId) {
        this.categoriesId = categoriesId;
    }
}
