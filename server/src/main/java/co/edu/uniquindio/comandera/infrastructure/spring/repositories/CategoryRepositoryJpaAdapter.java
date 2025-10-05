package co.edu.uniquindio.comandera.infrastructure.spring.repositories;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.model.Category;
import co.edu.uniquindio.comandera.domain.repository.CategoryRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaCategoryRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.CategoryJpaMapper;

@Service
public class CategoryRepositoryJpaAdapter implements CategoryRepository
{
    @Autowired
    private JpaCategoryRepository internal;

    @Override
    public Set<Category> findAllById(Long... ids)
    {
        Set<Category> categories = new HashSet<>();

        this.internal.findAllById(List.of(ids)).forEach(
            (c) -> categories.add(CategoryJpaMapper.toDomain(c))
        );

        return categories;
    }
}
