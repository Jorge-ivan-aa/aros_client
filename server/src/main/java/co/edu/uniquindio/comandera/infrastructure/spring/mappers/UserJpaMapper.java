package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import co.edu.uniquindio.comandera.domain.model.User;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.UserEntity;

public class UserJpaMapper
{
    public static User toDomain(UserEntity entity)
    {
        return new User(
            entity.getId(),
            entity.getName(),
            entity.getEmail(),
            entity.getPassword()
        ) {
            // 
        };
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
