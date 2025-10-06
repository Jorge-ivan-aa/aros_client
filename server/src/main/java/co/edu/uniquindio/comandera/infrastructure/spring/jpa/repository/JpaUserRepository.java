package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.UserEntity;

@Repository
@Service
public interface JpaUserRepository extends CrudRepository<UserEntity, Long>
{
    public Optional<UserEntity> findByEmail(String email);

    @Query("SELECT u FROM UserEntity u WHERE u.id = :id")
    public Optional<UserEntity> findByIdWithSubClass(@Param("id") Long id);
}
