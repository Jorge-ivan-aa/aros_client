package co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "refresh_tokens",
    uniqueConstraints = @UniqueConstraint(columnNames = { "user_id", "token" })
)
public class RefreshTokenEntity {
    @Id
    private String id;
    
    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;
    
    private String hash;
    
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime expiredAt;
    
    private LocalDateTime revokedAt;
    
    public RefreshTokenEntity() {
    }

    public RefreshTokenEntity(
        String id,
        String hash,
        LocalDateTime createdAt,
        LocalDateTime expiredAt,
        LocalDateTime revokedAt
    ) {
        this.id = id;
        this.hash = hash;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.revokedAt = revokedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiredAt() {
        return expiredAt;
    }

    public void setExpiredAt(LocalDateTime expiredAt) {
        this.expiredAt = expiredAt;
    }

    public LocalDateTime getRevokedAt() {
        return revokedAt;
    }

    public void setRevokedAt(LocalDateTime revokedAt) {
        this.revokedAt = revokedAt;
    }
}
