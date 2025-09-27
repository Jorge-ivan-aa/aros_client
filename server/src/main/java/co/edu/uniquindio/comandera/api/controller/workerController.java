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

    //Search workers by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getWorkerById(@PathVariable("id") Long id){
        if ( id  < 1 ) {
            return ResponseEntity.badRequest().body("El Id proporcionada no es válida.");
        }
        try {
            WorkerResponseDTO worker = workerService.getWorkerById(id);
            return ResponseEntity.ok(worker);
        } catch (jakarta.persistence.EntityNotFoundException ex) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND)
                    .body("No se encontró un trabajador con el id " + id);
        } catch (Exception ex) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al consultar el trabajador por id.");
        }
    }

    //Search workers by identification
    @GetMapping("/identification/{identification}")
    public ResponseEntity<?> getWorkerByIdentifiacition(@PathVariable("identification") String identification){
        if ( identification == null && identification.trim().isEmpty()  ) {
            return ResponseEntity.badRequest().body("El identificacion proporcionada no es válida.");
        }
        try {
            WorkerResponseDTO worker = workerService.getWorkerByIdentification(identification);
            return ResponseEntity.ok(worker);
        } catch (jakarta.persistence.EntityNotFoundException ex) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND)
                    .body("No se encontró un trabajador con la identificación " + identification);
        } catch (Exception ex) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al consultar el trabajador por identificación.");
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



}