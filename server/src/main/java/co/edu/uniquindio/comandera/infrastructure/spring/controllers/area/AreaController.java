package co.edu.uniquindio.comandera.infrastructure.spring.controllers.area;

import co.edu.uniquindio.comandera.application.dto.area.AreaDTO;
import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.repository.AreaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/area")
public class AreaController {

    @Autowired
    private AreaRepository areaRepository;

    //create area
    @PostMapping
    public ResponseEntity<AreaDTO> createArea(@Valid @RequestBody AreaDTO request) {
        AreaDTO created = areaRepository.create(request);
        return ResponseEntity.created(URI.create("/area/" + created.id())).body(created);
    }


    //get area by id
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Area>> getAreaById(@PathVariable Long id) {
        Optional<Area> area = areaRepository.findById(id);
        return ResponseEntity.ok(area);
    }


    //get all areas
    @GetMapping
    public ResponseEntity<List<AreaDTO>> getAllAreas() {
        List<AreaDTO> areas = areaRepository.getAll();
        return ResponseEntity.ok(areas);
    }

}
