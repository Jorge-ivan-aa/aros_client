package co.edu.uniquindio.comandera.domain.repository;

import java.util.List;
// ...existing code...
import co.edu.uniquindio.comandera.domain.model.Table;

public interface TableRepository {
    Table save(Table table);
    List<Table> saveAll(List<Table> tables);
    List<Table> findAll();
}
