package co.edu.uniquindio.comandera.infrastructure.springdata.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "daymenu_products",
    uniqueConstraints = @UniqueConstraint(columnNames = { "daymenu_id", "product_id" })
)
public class DayMenuProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "daymenu_id")
    private DayMenuEntity dayMenu;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    private Integer quantity;
    
    public DayMenuProduct() {
    }

    public DayMenuProduct(DayMenuEntity dayMenu, ProductEntity product, Integer quantity) {
        this.dayMenu = dayMenu;
        this.product = product;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DayMenuEntity getDayMenu() {
        return dayMenu;
    }

    public void setDayMenu(DayMenuEntity dayMenu) {
        this.dayMenu = dayMenu;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }
}
