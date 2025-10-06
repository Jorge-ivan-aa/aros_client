package co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;

@Entity
@jakarta.persistence.Table(name = "`tables`")
public class TableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numTable;
    
    private Boolean available;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "table_id")
    private Set<OrderEntity> orders;
    
    public TableEntity() {
        this.orders = new HashSet<>();
    }
    
    public TableEntity(String numTable, Boolean available) {
        this();
        this.numTable = numTable;
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumTable() {
        return numTable;
    }

    public void setNumTable(String numTable) {
        this.numTable = numTable;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Set<OrderEntity> getOrders() {
        return orders;
    }

    public void setOrders(Set<OrderEntity> orders) {
        this.orders = orders;
    }
}
