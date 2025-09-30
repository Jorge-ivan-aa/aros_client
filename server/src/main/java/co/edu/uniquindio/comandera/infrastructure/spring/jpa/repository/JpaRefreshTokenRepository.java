package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.RefreshTokenEntity;

@Repository
public interface JpaRefreshTokenRepository extends CrudRepository<RefreshTokenEntity, String>
{
    public Optional<RefreshTokenEntity> findByHash(String hash);
}
