package co.edu.uniquindio.comandera.domain.util;

import java.time.LocalDateTime;

public class RefreshToken
{
    private String id;

    private String hash;

    private LocalDateTime createdAt;

    private LocalDateTime expiredAt;

    private LocalDateTime revokedAt;

    private Long userId;
    
    public RefreshToken() {
        super();
    }

    public RefreshToken(
        String id,
        String hash,
        LocalDateTime createdAt,
        LocalDateTime expiredAt,
        LocalDateTime revokedAt,
        Long userId
    ) {
        this.id = id;
        this.hash = hash;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.revokedAt = revokedAt;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
