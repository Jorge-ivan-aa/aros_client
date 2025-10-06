package co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class OrderEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Float total;
    
    private LocalDateTime creation;
    private Boolean completed;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private WorkerEntity worker;
    
    @ManyToOne
    @JoinColumn(name = "table_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private TableEntity table;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<OrderProductEntity> products;
    
    public OrderEntity() {
        this.products = new HashSet<>();
    }

    public OrderEntity(
        WorkerEntity worker,
        TableEntity table,
        Float total,
        Boolean completed,
        LocalDateTime creation
    ) {
        this();
        this.total = total;
        this.worker = worker;
        this.table = table;
        this.completed = completed;
        this.creation = creation;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
    
    public Boolean getCompleted() {
        return completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public WorkerEntity getWorker() {
        return worker;
    }

    public void setWorker(WorkerEntity worker) {
        this.worker = worker;
    }

    public TableEntity getTable() {
        return table;
    }

    public void setTable(TableEntity table) {
        this.table = table;
    }

    public LocalDateTime getCreation() {
        return creation;
    }

    public void setCreation(LocalDateTime creation) {
        this.creation = creation;
    }

    public Set<OrderProductEntity> getProducts() {
        return products;
    }

    public void setProducts(Set<OrderProductEntity> products) {
        this.products = products;
    }
}
