package co.edu.uniquindio.comandera.infrastructure.spring.repositories;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.model.Product;
import co.edu.uniquindio.comandera.domain.repository.ProductRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaProductRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.AreaJpaMapper;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.CategoryJpaMapper;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.ProductJpaMapper;

@Service
public class ProductRepositoryJpaAdapter implements ProductRepository 
{
    @Autowired
    private JpaProductRepository internal;

    @Override
    public void create(Product product)
    {
        this.internal.save(ProductJpaMapper.toEntity(
            product,
            AreaJpaMapper.toEntity(product.getPreparationArea(), null, null),
            new HashSet<>(product.getCategories().stream().map((c) -> {
                return CategoryJpaMapper.toEntity(c, null);
            }).toList())
        ));
    }
}
