package co.edu.uniquindio.comandera.application.services;

import co.edu.uniquindio.comandera.api.dto.AreaDTO;
import co.edu.uniquindio.comandera.api.dto.WorkerRequestDTO;
import co.edu.uniquindio.comandera.api.dto.WorkerResponseDTO;

import co.edu.uniquindio.comandera.infrastructure.springdata.entity.AreaEntity;
import co.edu.uniquindio.comandera.infrastructure.springdata.entity.ProductEntity;
import co.edu.uniquindio.comandera.infrastructure.springdata.entity.WorkerEntity;
import co.edu.uniquindio.comandera.repostories.AreaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import co.edu.uniquindio.comandera.repostories.WorkerRepository;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

// WorkerService.java
@Service
public class WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Transactional
    public WorkerResponseDTO updateWorker(String identification, WorkerRequestDTO workerDTO) {
        WorkerEntity worker = workerRepository.findByIdentification(identification)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker no encontrado"));

        if(workerDTO.getName()!=null && !workerDTO.getName().isBlank()){
            worker.setName(workerDTO.getName());
        }
        if (workerDTO.getPhone() != null && !workerDTO.getPhone().isBlank()) {
            worker.setPhone(workerDTO.getPhone());
        }
        if (workerDTO.getImage() != null && !workerDTO.getImage().isBlank()) {
            worker.setImage(workerDTO.getImage());
        }
        if (workerDTO.getAddress() != null && !workerDTO.getAddress().isBlank()) {
            worker.setAddress(workerDTO.getAddress());
        }
        if (workerDTO.getObservations() != null && !workerDTO.getObservations().isBlank()) {
            worker.setObservations(workerDTO.getObservations());
        }
        if (workerDTO.getEnable() != null) {
            worker.setEnable(workerDTO.getEnable());
        }

        Set<Long> areaIds = workerDTO.getAreaIds();

        if (areaIds != null) {
            if (areaIds.isEmpty()) {
                worker.setAreas(new HashSet<>());
            } else {
                Iterable<AreaEntity> found = areaRepository.findAllById(areaIds);
                Set<AreaEntity> areas = new HashSet<>();
                found.forEach(areas::add);


                if (areas.size() != areaIds.size()) {
                    throw new IllegalArgumentException("Some area IDs do not exist");
                }

                worker.setAreas(areas);
            }
        }

        WorkerEntity saved = workerRepository.save(worker);
        return convertToDTO(saved);
    }

    public WorkerResponseDTO createWorker(WorkerRequestDTO workerDTO) {

        if(workerRepository.existsByIdentification(workerDTO.getIdentification())){
            throw new IllegalArgumentException("The identification already exist");
        }

        WorkerEntity worker = new WorkerEntity(
                workerDTO.getIdentification(),
                workerDTO.getName(),
                workerDTO.getPassword(),
                workerDTO.getPhone(),
                workerDTO.getImage(),
                workerDTO.getAddress(),
                workerDTO.getObservations(),
                workerDTO.getEnable() != null ? workerDTO.getEnable() : true
        );

        Set<Long> areaIds = workerDTO.getAreaIds();
        if (areaIds != null && !areaIds.isEmpty()) {
            Set<AreaEntity> areas = new HashSet<>((Collection) areaRepository.findAllById(areaIds));
            worker.setAreas(areas);
        } else {
            worker.setAreas(Collections.emptySet());
        }


        WorkerEntity savedWorker = workerRepository.save(worker);

        return convertToDTO(savedWorker);
    }
    
    public WorkerResponseDTO getWorkerById(Long id) {
        WorkerEntity worker = workerRepository.findById(id)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("No se encontró un trabajador con id " + id));
        return convertToDTO(worker);
    }

    public WorkerResponseDTO getWorkerByIdentification(String identification) {
        if (identification == null || identification.isBlank()) {
            throw new IllegalArgumentException("La identificación no puede estar vacía.");
        }
        WorkerEntity worker = workerRepository.findByIdentification(identification)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException(
                        "No se encontró un trabajador con la identificación " + identification));
        return convertToDTO(worker);
    }

    public java.util.List<WorkerResponseDTO> findAllWorkers() {
        java.util.List<WorkerEntity> workers = (java.util.List<WorkerEntity>) workerRepository.findAll();
        if (workers == null || workers.isEmpty()) {
            return java.util.Collections.emptyList();
        }
        return workers.stream()
                .map(this::convertToDTO)
                .toList();
    }

    private WorkerResponseDTO convertToDTO(WorkerEntity worker) {
        WorkerResponseDTO dto = new WorkerResponseDTO();
        dto.setId(worker.getId());
        dto.setIdentification(worker.getIdentification());
        dto.setIdentification(worker.getIdentification());
        dto.setName(worker.getName());
        dto.setPhone(worker.getPhone());
        dto.setImage(worker.getImage());
        dto.setAddress(worker.getAddress());
        dto.setObservations(worker.getObservations());
        dto.setEnable(worker.getEnable());

        Set<AreaDTO> areaDTOs = worker.getAreas().stream()
                .map(area -> new AreaDTO(
                        area.getId(),
                        area.getName(),
                        area.getType(),
                        area.getProducts().stream().map(ProductEntity::getId).collect(Collectors.toSet()),
                        area.getWorkers().stream().map(WorkerEntity::getId).collect(Collectors.toSet())
                ))
                .collect(Collectors.toSet());

        dto.setAreas(areaDTOs);

        return dto;
    }

}