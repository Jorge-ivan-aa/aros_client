package co.edu.uniquindio.comandera.api.dto;



import co.edu.uniquindio.comandera.domain.model.enums.Area;

import java.util.Set;

public record AreaDTO(
        Long id,
        String name,
        Area type,
        Set<Long> productIds,
        Set<Long> workerIds
) {}
