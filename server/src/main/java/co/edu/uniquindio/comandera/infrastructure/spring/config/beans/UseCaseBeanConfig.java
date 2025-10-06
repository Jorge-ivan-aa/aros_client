package co.edu.uniquindio.comandera.infrastructure.spring.config.beans;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import co.edu.uniquindio.comandera.application.usecases.auth.LoginTokenUseCase;
import co.edu.uniquindio.comandera.application.usecases.auth.RefreshTokenUseCase;
import co.edu.uniquindio.comandera.application.usecases.product.CreateProductUseCase;
import co.edu.uniquindio.comandera.domain.model.services.PasswordHasher;
import co.edu.uniquindio.comandera.domain.repository.AreaRepository;
import co.edu.uniquindio.comandera.domain.repository.CategoryRepository;
import co.edu.uniquindio.comandera.domain.repository.ProductRepository;
import co.edu.uniquindio.comandera.domain.repository.RefreshTokenRepository;
import co.edu.uniquindio.comandera.domain.repository.UserRepository;
import co.edu.uniquindio.comandera.domain.service.TokenService;
import jakarta.persistence.EntityManager;

@Configuration
public class UseCaseBeanConfig
{
    @Bean
    public LoginTokenUseCase loginTokenUseCase(
        TokenService tokenService,
        UserRepository workerRespository,
        RefreshTokenRepository refreshTokenRepository,
        PasswordHasher passwordHasher,
        @Value("${security.token.lifetime}") Integer tokenLifeTime
    ) {
        return new LoginTokenUseCase(
            tokenService,
            workerRespository,
            refreshTokenRepository,
            passwordHasher,
            tokenLifeTime
        );
    }
    
    @Bean
    public RefreshTokenUseCase refreshTokenUseCase(
        UserRepository workerRespository,
        RefreshTokenRepository refreshTokenRepository,
        TokenService tokenService,
        EntityManager manager
    ) {
        return new RefreshTokenUseCase(
            refreshTokenRepository,
            workerRespository,
            tokenService,
            manager
        );
    }

    @Bean
    public CreateProductUseCase createProductUseCase(
        ProductRepository productRepository,
        AreaRepository areaRepository,
        CategoryRepository categoryRepository
    ) {
        return new CreateProductUseCase(
            productRepository,
            areaRepository,
            categoryRepository
        );
    }
}
