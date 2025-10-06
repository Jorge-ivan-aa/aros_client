package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import co.edu.uniquindio.comandera.domain.model.Table;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.TableEntity;


public class TableJpaMapper {

    // Convertir de Entity a Dominio (modelo)
    public static Table toDomain(TableEntity entity) {
        if (entity == null) return null;

        return new Table(
            entity.getId(),
            entity.getNumTable(),
            entity.getAvailable()
        );
    }

    // Convertir de Dominio (modelo) a Entity
    public static TableEntity toEntity(Table table) {
        if (table == null) return null;

        TableEntity entity = new TableEntity();
        if (table.getId() != null) entity.setId(Long.valueOf(table.getId()));
        entity.setNumTable(table.getNumTable());
        entity.setAvailable(table.isAvailable());

        return entity;
    }
}
