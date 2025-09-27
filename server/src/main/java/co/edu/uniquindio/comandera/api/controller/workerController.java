package co.edu.uniquindio.comandera.api.controller;

import co.edu.uniquindio.comandera.api.dto.WorkerRequestDTO;
import co.edu.uniquindio.comandera.api.dto.WorkerResponseDTO;
import co.edu.uniquindio.comandera.application.services.WorkerService;
import co.edu.uniquindio.comandera.domain.model.Worker;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/worker")
public class workerController {

    @Autowired
    private WorkerService workerService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateWorker(@PathVariable("id") String id, @Valid @RequestBody WorkerRequestDTO workerDTO) {
        WorkerResponseDTO updated = workerService.updateWorker(id, workerDTO);
        return ResponseEntity.ok(updated);
    }

    @PostMapping
    public ResponseEntity<?> createWorker(@Valid @RequestBody WorkerRequestDTO workerDTO) {
        try {
            WorkerResponseDTO createdWorker = workerService.createWorker(workerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdWorker);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getWorkerById(@PathVariable("id") String id){
        if (id== null ) {
            return ResponseEntity.badRequest().body("El id proporcionado no es válido.");
        }
        try {
            var worker = workerService.getWorkerById(id); // Debe devolver el DTO o la entidad correspondiente
            return ResponseEntity.ok(worker);
        } catch (jakarta.persistence.EntityNotFoundException ex) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND)
                    .body("No se encontró un trabajador con id " + id);
        } catch (Exception ex) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al consultar el trabajador.");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllWorkers() {
        try {
            java.util.List<WorkerResponseDTO> workers = workerService.findAllWorkers();
            if (workers == null || workers.isEmpty()) {
                return ResponseEntity.status(org.springframework.http.HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.ok(workers);
        } catch (Exception ex) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al consultar los trabajadores.");
        }
    }

    @GetMapping("/identification/{identification}")
    public ResponseEntity<?> getWorkerByIdentification(@PathVariable("identification") String identification) {
        if (identification == null || identification.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("La identificación proporcionada no es válida.");
        }

        try {
            WorkerResponseDTO worker = workerService.getWorkerByIdentification(identification.trim());
            return ResponseEntity.ok(worker);
        } catch (jakarta.persistence.EntityNotFoundException ex) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND)
                    .body("No se encontró un trabajador con la identificación " + identification);
        } catch (Exception ex) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al consultar el trabajador por identificación.");
        }
    }

}