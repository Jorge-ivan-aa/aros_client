package co.edu.uniquindio.comandera.application.usecases.product;

import java.util.Set;

import co.edu.uniquindio.comandera.application.dto.product.CreateProductRequestDto;
import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.Category;
import co.edu.uniquindio.comandera.domain.model.Product;
import co.edu.uniquindio.comandera.domain.model.enums.ProductStatus;
import co.edu.uniquindio.comandera.domain.repository.AreaRepository;
import co.edu.uniquindio.comandera.domain.repository.CategoryRepository;
import co.edu.uniquindio.comandera.domain.repository.ProductRepository;

public class CreateProductUseCase
{
    private ProductRepository productRepository;

    private AreaRepository areaRepository;

    private CategoryRepository categoryRepository;

    public CreateProductUseCase(
        ProductRepository productRepository,
        AreaRepository areaRepository,
        CategoryRepository categoryRepository
    ) {
        this.productRepository = productRepository;
        this.areaRepository = areaRepository;
        this.categoryRepository = categoryRepository;
    }

    public void execute(CreateProductRequestDto request)
    {
        this.productRepository.create(this.requestToDomain(request));
    }

    private Product requestToDomain(CreateProductRequestDto request)
    {
        Area area = this.areaRepository
            .findById(request.getAreaId())
            // .get();
            .orElseThrow(() -> new RuntimeException("Not Found area"));

        
        Set<Category> categories = null;

        if (request.getCategoriesId() != null) {
            categories = this.categoryRepository
                .findAllById(request.getCategoriesId().toArray(new Long[0]));
        }

        Product product = new Product();

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setEstimatedTime(request.getEstimateTime());
        product.setPreparationArea(area);
        product.setCategories(categories);
        // product.setPreparationStatus(ProductStatus.PREPARED);

        return product;
    }
}
