package co.edu.uniquindio.comandera.application.usecases.worker;

import co.edu.uniquindio.comandera.application.dto.worker.WorkerRequestDTO;
import co.edu.uniquindio.comandera.application.dto.worker.WorkerResponseDTO;
import co.edu.uniquindio.comandera.domain.repository.AreaRepository;
import co.edu.uniquindio.comandera.domain.repository.WorkerRepository;
import co.edu.uniquindio.comandera.domain.model.Worker;
import co.edu.uniquindio.comandera.domain.model.Area;

import java.util.HashSet;
import java.util.Set;

public class CreateWorkerUseCase {

    private final WorkerRepository workerRepository;
    private final AreaRepository areaRepository;

    public CreateWorkerUseCase(WorkerRepository workerRepository, AreaRepository areaRepository) {
        this.workerRepository = workerRepository;
        this.areaRepository = areaRepository;
    }

    public WorkerResponseDTO execute(WorkerRequestDTO workerDTO) {
        if (workerRepository.existsByIdentification(workerDTO.getIdentification())) {
            throw new IllegalArgumentException("The identification already exists");
        }

        Worker worker = new Worker(
                null,
                workerDTO.getIdentification(),
                workerDTO.getName(),
                workerDTO.getPassword(),
                workerDTO.getPhone(),
                workerDTO.getImage(),
                workerDTO.getAddress(),
                workerDTO.getObservations(),
                workerDTO.getEnable() != null ? workerDTO.getEnable() : true
        );

        if (workerDTO.getAreaIds() != null && !workerDTO.getAreaIds().isEmpty()) {
            Set<Area> areas = new HashSet<>(areaRepository.findAllByIds(workerDTO.getAreaIds()));
            worker.setAreas(areas);
        }

        Worker saved = workerRepository.save(worker);

        return null;
    }
}
