package co.edu.uniquindio.comandera.application.usecases.table;

import co.edu.uniquindio.comandera.domain.model.Table;
import co.edu.uniquindio.comandera.domain.repository.TableRepository;

import java.rmi.server.UID;
import java.util.UUID;

public class CreateTableUseCase {

    private final TableRepository repository;
    private final GetNextTableNumberUseCase getNextTableNumberUseCase;

    public CreateTableUseCase(TableRepository repository, GetNextTableNumberUseCase getNextTableNumberUseCase) {
        this.repository = repository;
        this.getNextTableNumberUseCase = getNextTableNumberUseCase;
    }

    public Table execute() {
        int nextNum = getNextTableNumberUseCase.execute();
        Table table = new Table(Long.valueOf(nextNum), String.valueOf(nextNum), false);
        return repository.save(table);
    }
}
