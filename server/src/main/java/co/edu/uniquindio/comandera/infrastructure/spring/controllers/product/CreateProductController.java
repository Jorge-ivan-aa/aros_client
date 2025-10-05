package co.edu.uniquindio.comandera.infrastructure.spring.controllers.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.uniquindio.comandera.application.dto.product.CreateProductRequestDto;
import co.edu.uniquindio.comandera.application.usecases.product.CreateProductUseCase;
import co.edu.uniquindio.comandera.infrastructure.spring.security.authorization.MustBeAdmin;

@RestController
@RequestMapping(path = "/api/")
public class CreateProductController
{
    @Autowired
    private CreateProductUseCase createProduct;

    @PostMapping(path = "product")
    @MustBeAdmin
    public ResponseEntity<?> createProduct(
        @RequestBody
        CreateProductRequestDto productCreationDto
    ) {
        // try {
            this.createProduct.execute(productCreationDto);
        // } catch (Exception e) {
        //     return ResponseEntity.badRequest().build();
        // }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
