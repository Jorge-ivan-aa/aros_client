package co.edu.uniquindio.comandera.infrastructure.spring.adapters;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import co.edu.uniquindio.comandera.application.dto.area.AreaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.enums.AreaType;
import co.edu.uniquindio.comandera.domain.repository.AreaRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaAreaRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.AreaJpaMapper;

@Service
public class AreaRepositoryJpaAdapter implements AreaRepository
{
    @Autowired
    private JpaAreaRepository internal;

    @Override
    public Optional<Area> findById(Long id)
    {
        return this.internal.findById(id).map(AreaJpaMapper::toDomain);
    }

    @Override
    public List<Area> findByType(AreaType type)
    {
        return this.internal.findByType(type);
    }

    @Override
    public int findAllByIds(Set<Long> areaIds) {
        return 0;
    }

    @Override
    public AreaDTO create(AreaDTO request) {
        return null;
    }

    @Override
    public List<AreaDTO> getAll() {
        return List.of();
    }
}
