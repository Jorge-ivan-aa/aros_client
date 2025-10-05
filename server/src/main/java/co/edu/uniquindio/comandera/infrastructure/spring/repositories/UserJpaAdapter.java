package co.edu.uniquindio.comandera.infrastructure.spring.repositories;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.model.Admin;
import co.edu.uniquindio.comandera.domain.model.User;
import co.edu.uniquindio.comandera.domain.repository.UserRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.AdminEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.UserEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaUserRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.AdminJpaMapper;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.UserJpaMapper;

@Service
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

        if (entity.get() instanceof AdminEntity en) {
            Admin admin = AdminJpaMapper.toDomain(en);

            return Optional.of(admin);
        } else {
            User user = UserJpaMapper.toDomain(entity.get());

            return Optional.of(user);
        }
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
