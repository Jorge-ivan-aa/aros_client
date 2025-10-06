package co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "administrators")
@PrimaryKeyJoinColumn(name = "id")
public class AdminEntity extends UserEntity {
    @Column(nullable = true)
    private Boolean active;

    public AdminEntity() {
    }

    public AdminEntity(Long id, String name, String email, String password) {
        super(id, name, email, password);
    }
}
