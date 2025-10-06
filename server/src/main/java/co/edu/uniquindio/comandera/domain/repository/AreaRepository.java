package co.edu.uniquindio.comandera.domain.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import co.edu.uniquindio.comandera.application.dto.area.AreaDTO;
import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.enums.AreaType;
import jakarta.validation.Valid;

public interface AreaRepository {
    /**
     * find an area using his id
     * 
     * @param id area's id
     *
     * @return area found
     */
    public Optional<Area> findById(Long id);
    
    /**
     * find areas using type
     * 
     * @param type type for search
     *
     * @return areas with the type
     */
    public List<Area> findByType(AreaType type);

    /**
     *
     * @param areaIds
     * @return
     */
    int findAllByIds(Set<Long> areaIds);

    AreaDTO create(@Valid AreaDTO request);

    List<AreaDTO> getAll();
}
