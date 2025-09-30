package co.edu.uniquindio.comandera.infrastructure.spring.repositories;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.repository.RefreshTokenRepository;
import co.edu.uniquindio.comandera.domain.util.RefreshToken;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.RefreshTokenEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.UserEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaRefreshTokenRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaUserRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.RefreshTokenJpaMapper;

@Service
public class RefreshTokenJpaAdapter implements RefreshTokenRepository
{
    @Autowired
    private JpaRefreshTokenRepository internal;
    
    @Autowired
    private JpaUserRepository userRepository;
    
    @Override
    public RefreshToken create(RefreshToken token)
    {
        UserEntity user = this.userRepository
            .findById(token.getUserId())
            .orElseThrow();

        return RefreshTokenJpaMapper.toDomain(
            this.internal.save(RefreshTokenJpaMapper.toEntity(token, user))
        );
    }

    @Override
    public Optional<RefreshToken> findById(String id)
    {
        return Optional.empty();
    }

    @Override
    public Optional<RefreshToken> findByHash(String hash)
    {
        Optional<RefreshTokenEntity> entity = this.internal.findByHash(hash);
        
        if (entity.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(RefreshTokenJpaMapper.toDomain(entity.get()));
    }

    @Override
    public void revokeToken(String id)
    {
        RefreshTokenEntity entity = this.internal.findById(id)
            .orElseThrow();
        
        entity.setRevokedAt(LocalDateTime.now());
        
        this.internal.save(entity);
    }
}
