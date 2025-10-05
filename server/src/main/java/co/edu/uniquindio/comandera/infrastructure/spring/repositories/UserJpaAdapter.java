package co.edu.uniquindio.comandera.infrastructure.spring.repositories;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.model.User;
import co.edu.uniquindio.comandera.domain.repository.UserRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.UserEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaUserRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.UserJpaMapper;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserJpaAdapter implements UserRepository
{
    @Autowired
    private JpaUserRepository internal;

    @Override
    public void deleteById(Long id)
    {
        // TODO Auto-generated method stub
    }
    
    @Override
    public Optional<User> findByEmail(String email)
    {
        Optional<UserEntity> entity = this.internal.findByEmail(email);

        if (entity.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(UserJpaMapper.toDomain(entity.get()));
    }
    
    @Override
    public Optional<User> findById(Long id)
    {
        Optional<UserEntity> entity = this.internal.findById(id);
        
        if (entity.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(UserJpaMapper.toDomain(entity.get()));
    }
}
