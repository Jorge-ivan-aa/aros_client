package co.edu.uniquindio.comandera.api.controller;

import co.edu.uniquindio.comandera.api.dto.AreaDTO;
import co.edu.uniquindio.comandera.application.services.AreaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/area")
public class areaController {

    @Autowired
    private AreaService areaService;

    //create area
    @PostMapping
    public ResponseEntity<AreaDTO> createArea(@Valid @RequestBody AreaDTO request) {
        AreaDTO created = areaService.create(request);
        return ResponseEntity.created(URI.create("/area/" + created.id())).body(created);
    }


    //get area by id
    @GetMapping("/{id}")
    public ResponseEntity<AreaDTO> getAreaById(@PathVariable Long id) {
        AreaDTO area = areaService.findById(id);
        return ResponseEntity.ok(area);
    }


    //get all areas
    @GetMapping
    public ResponseEntity<List<AreaDTO>> getAllAreas() {
        List<AreaDTO> areas = areaService.getAll();
        return ResponseEntity.ok(areas);
    }

}
