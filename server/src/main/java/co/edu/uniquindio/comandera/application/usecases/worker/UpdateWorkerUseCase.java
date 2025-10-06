package co.edu.uniquindio.comandera.application.usecases.worker;

import co.edu.uniquindio.comandera.application.dto.worker.WorkerRequestDTO;
import co.edu.uniquindio.comandera.application.dto.worker.WorkerResponseDTO;
import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.Worker;
import co.edu.uniquindio.comandera.domain.repository.AreaRepository;
import co.edu.uniquindio.comandera.domain.repository.WorkerRepository;

import java.util.HashSet;
import java.util.Set;

public class UpdateWorkerUseCase {

    private final WorkerRepository workerRepository;
    private final AreaRepository areaRepository;

    public UpdateWorkerUseCase(WorkerRepository workerRepository, AreaRepository areaRepository) {
        this.workerRepository = workerRepository;
        this.areaRepository = areaRepository;
    }

    public WorkerResponseDTO execute(String identification, WorkerRequestDTO dto) {
        Worker worker = workerRepository.findByIdentification(identification)
                .orElseThrow(() -> new IllegalArgumentException("Worker not found"));

//        worker.updateWith(dto);

        if (dto.getAreaIds() != null) {
            Set<Area> areas = new HashSet<>(areaRepository.findAllByIds(dto.getAreaIds()));
            worker.setAreas(areas);
        }

//        Worker updated = workerRepository.save(worker);
        return null;
    };
}
