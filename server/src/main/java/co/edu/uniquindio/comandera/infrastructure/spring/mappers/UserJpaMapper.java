package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import co.edu.uniquindio.comandera.domain.model.User;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.AdminEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.UserEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.WorkerEntity;

public class UserJpaMapper
{
    public static User toDomain(UserEntity entity)
    {
        if (entity instanceof WorkerEntity en) {
            return WorkerJpaMapper.toDomain(en);
        } else if (entity instanceof AdminEntity en) {
            return AdminJpaMapper.toDomain(en);
        }

        return new User(
            entity.getId(),
            entity.getName(),
            entity.getEmail(),
            entity.getPassword()
        );
    }
    
    public static UserEntity toEntity(User user)
    {
        return new UserEntity(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPasswordHash()
        ) {
            // 
        };
    }
}
