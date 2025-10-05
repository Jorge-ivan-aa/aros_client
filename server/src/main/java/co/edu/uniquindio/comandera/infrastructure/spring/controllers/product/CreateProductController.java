package co.edu.uniquindio.comandera.infrastructure.spring.controllers.product;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.uniquindio.comandera.application.dto.product.CreateProductRequestDto;
import co.edu.uniquindio.comandera.application.exceptions.auth.NotFoundAreaException;
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
        CreateProductRequestDto productCreationDto,
        Authentication authentication
   ) {
        try {
            this.createProduct.execute(productCreationDto);
        } catch (NotFoundAreaException e) {
            return ResponseEntity.badRequest().body(
                Map.of("error", e.getMessage())
            );
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
