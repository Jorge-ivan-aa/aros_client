package co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "daymenus")
@PrimaryKeyJoinColumn(name = "id")
public class DayMenuEntity extends ProductEntity {
    private LocalDateTime creation;
    
    @OneToMany(mappedBy = "dayMenu", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<DayMenuProductEntity> products;
    
    public DayMenuEntity() {
        this.products = new HashSet<>();
    }

    public DayMenuEntity(LocalDateTime creation) {
        this();
        this.creation = creation;
    }

    public LocalDateTime getCreation() {
        return creation;
    }

    public void setCreation(LocalDateTime creation) {
        this.creation = creation;
    }

    public Set<DayMenuProductEntity> getProducts() {
        return products;
    }

    public void setProducts(Set<DayMenuProductEntity> products) {
        this.products = products;
    }
}
