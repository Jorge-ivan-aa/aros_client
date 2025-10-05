package co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity;

import java.util.HashSet;
import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.enums.AreaType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "areas",
    uniqueConstraints = @UniqueConstraint(columnNames = { "name", "type" })
)
public class AreaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;

    private AreaType type;
    
    @OneToMany
    @JoinColumn(name = "preparation_area")
    private Set<ProductEntity> products;
    
    @ManyToMany(mappedBy = "areas")
    private Set<WorkerEntity> workers;
    
    public AreaEntity() {
        this.products = new HashSet<>();
        this.workers = new HashSet<>();
    }

    public AreaEntity(String name, AreaType type) {
        this();
        this.name = name;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AreaType getType() {
        return type;
    }

    public void setType(AreaType type) {
        this.type = type;
    }

    public Set<ProductEntity> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductEntity> products) {
        this.products = products;
    }

    public Set<WorkerEntity> getWorkers() {
        return workers;
    }

    public void setWorkers(Set<WorkerEntity> workers) {
        this.workers = workers;
    }
}
