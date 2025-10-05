package co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "order_products",
    uniqueConstraints = @UniqueConstraint(columnNames = { "order_id", "product_id" })
)
public class OrderProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    private String name;
    
    private Float price;
    
    private Integer quantity;

    @Column(nullable = true)
    private String image;

    @OneToMany(mappedBy = "orderProduct")
    private Set<OrderSubProductsEntity> subProducts;
    
    public OrderProductEntity() {
    }

    public OrderProductEntity(
        OrderEntity order,
        ProductEntity product,
        String name,
        Float price,
        Integer quantity,
        String image
    ) {
        this.order = order;
        this.product = product;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<OrderSubProductsEntity> getSubProducts() {
        return subProducts;
    }

    public void setSubProducts(Set<OrderSubProductsEntity> subProducts) {
        this.subProducts = subProducts;
    }
}
