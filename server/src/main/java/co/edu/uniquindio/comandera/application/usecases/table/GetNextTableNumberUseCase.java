package co.edu.uniquindio.comandera.application.usecases.table;

import co.edu.uniquindio.comandera.domain.model.Table;
import co.edu.uniquindio.comandera.domain.repository.TableRepository;
import java.util.List;

public class GetNextTableNumberUseCase {

    private final TableRepository repository;

    public GetNextTableNumberUseCase(TableRepository repository) {
        this.repository = repository;
    }

    public int execute() {
        List<Table> all = repository.findAll();
        int max = 0;
        for (Table table : all) {
            try {
                int v = Integer.parseInt(table.getNumTable());
                if (v > max) max = v;
            } catch (NumberFormatException ignored) {
                // ignore non-numeric names
            }
        }
        return max + 1;
    }
}
