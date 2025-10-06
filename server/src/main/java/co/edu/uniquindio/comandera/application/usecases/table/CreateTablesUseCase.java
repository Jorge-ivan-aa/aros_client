package co.edu.uniquindio.comandera.application.usecases.table;

import java.util.ArrayList;
import java.util.List;

import co.edu.uniquindio.comandera.domain.model.Table;
import co.edu.uniquindio.comandera.domain.repository.TableRepository;

public class CreateTablesUseCase {

    private final TableRepository repository;
    private final GetNextTableNumberUseCase getNextTableNumberUseCase;

    public CreateTablesUseCase(TableRepository repository, GetNextTableNumberUseCase getNextTableNumberUseCase) {
        this.repository = repository;
        this.getNextTableNumberUseCase = getNextTableNumberUseCase;
    }

    public List<Table> execute(int count) {
        if (count <= 0) {
            throw new IllegalArgumentException("Count must be greater than 0");
        }

        int start = getNextTableNumberUseCase.execute();

        List<Table> tables = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            int num = start + i;
            tables.add(new Table(Long.valueOf(num), Integer.toString(num), true));
        }

        return repository.saveAll(tables);
    }
}
