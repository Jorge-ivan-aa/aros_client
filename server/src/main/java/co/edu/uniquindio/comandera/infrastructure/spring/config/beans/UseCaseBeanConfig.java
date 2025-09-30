package co.edu.uniquindio.comandera.infrastructure.spring.config.beans;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import co.edu.uniquindio.comandera.application.usecases.auth.LoginTokenUseCase;
import co.edu.uniquindio.comandera.application.usecases.auth.RefreshTokenUseCase;
import co.edu.uniquindio.comandera.domain.model.services.PasswordHasher;
import co.edu.uniquindio.comandera.domain.repository.RefreshTokenRepository;
import co.edu.uniquindio.comandera.domain.repository.UserRepository;
import co.edu.uniquindio.comandera.domain.service.TokenService;

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
        TokenService tokenService
    ) {
        return new RefreshTokenUseCase(
            refreshTokenRepository,
            workerRespository,
            tokenService
        );
    }
}
