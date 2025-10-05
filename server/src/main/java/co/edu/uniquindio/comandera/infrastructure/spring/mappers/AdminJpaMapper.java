package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import co.edu.uniquindio.comandera.domain.model.Admin;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.AdminEntity;

public class AdminJpaMapper
{
    public static Admin toDomain(AdminEntity entity)
    {
        Admin domain = new Admin(
            entity.getId(),
            entity.getName(),
            entity.getEmail(),
            entity.getPassword()
        );

        return domain;
    }

    public static AdminEntity toEntity(Admin domain)
    {
        AdminEntity entity = new AdminEntity();

        entity.setId(domain.getId());
        entity.setName(domain.getName());
        entity.setEmail(domain.getEmail());
        entity.setPassword(domain.getPasswordHash());

        return entity;
    }
}
