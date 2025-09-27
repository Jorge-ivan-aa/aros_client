package co.edu.uniquindio.comandera.infrastructure.springdata.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "workers")
@PrimaryKeyJoinColumn(name = "id")
public class WorkerEntity extends UserEntity {

    private String identification;

    private String phone;
    
    private String image;

    private String address;
    
    private String observations;
    
    private Boolean enable;
    
    @ManyToMany()
    @JoinTable(
        name = "worker_areas",
        joinColumns = @JoinColumn(name = "worker_id"),
        inverseJoinColumns = @JoinColumn(name = "area_id")
    )
    private Set<AreaEntity> areas;
    
    @OneToMany(mappedBy = "worker")
    private Set<OrderEntity> orders;
    
    public WorkerEntity() {
        this.areas = new HashSet<>();
        this.orders = new HashSet<>();
    }

    public WorkerEntity(
        String identification,
        String name,
        String password,
        String phone,
        String image,
        String address,
        String observations,
        Boolean enable
    ) {
        super(name, password);
        this.identification = identification;
        this.phone = phone;
        this.image = image;
        this.address = address;
        this.observations = observations;
        this.enable = enable;
        this.areas = new HashSet<>();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public Boolean getEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public Set<AreaEntity> getAreas() {
        return areas;
    }

    public void setAreas(Set<AreaEntity> areas) {
        this.areas = areas;
    }

    public Set<OrderEntity> getOrders() {
        return orders;
    }

    public void setOrders(Set<OrderEntity> orders) {
        this.orders = orders;
    }
}
