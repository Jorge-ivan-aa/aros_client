package co.edu.uniquindio.comandera.domain.repository;

import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.Category;

public interface CategoryRepository
{
    public Set<Category> findAllById(Long ...ids);
}
