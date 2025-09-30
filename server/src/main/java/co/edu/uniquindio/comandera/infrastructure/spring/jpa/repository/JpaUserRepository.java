package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.UserEntity;

@Repository
public interface JpaUserRepository extends CrudRepository<UserEntity, Long>
{
    public Optional<UserEntity> findByEmail(String email);
}
