package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import co.edu.uniquindio.comandera.domain.util.RefreshToken;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.RefreshTokenEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.UserEntity;

public class RefreshTokenJpaMapper
{
    public static RefreshToken toDomain(RefreshTokenEntity entity)
    {
        RefreshToken model = new RefreshToken();

        model.setId(entity.getId());
        model.setHash(entity.getHash());
        model.setCreatedAt(entity.getCreatedAt());
        model.setExpiredAt(entity.getExpiredAt());
        model.setRevokedAt(entity.getRevokedAt());
        model.setUserId(entity.getUser().getId());

        return model;
    }
    
    public static RefreshTokenEntity toEntity(RefreshToken model, UserEntity user)
    {
        RefreshTokenEntity entity = new RefreshTokenEntity();
        
        entity.setId(model.getId());
        entity.setHash(model.getHash());
        entity.setCreatedAt(model.getCreatedAt());
        entity.setExpiredAt(model.getExpiredAt());
        entity.setRevokedAt(model.getRevokedAt());
        entity.setUser(user);
        
        return entity;
    }
}
