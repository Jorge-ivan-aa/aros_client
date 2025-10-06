package co.edu.uniquindio.comandera.application.usecases.auth;

import java.time.LocalDateTime;
import java.util.UUID;

import co.edu.uniquindio.comandera.application.dto.auth.AuthTokenReponseDto;
import co.edu.uniquindio.comandera.application.exceptions.auth.InvalidTokenException;
import co.edu.uniquindio.comandera.domain.model.User;
import co.edu.uniquindio.comandera.domain.repository.RefreshTokenRepository;
import co.edu.uniquindio.comandera.domain.repository.UserRepository;
import co.edu.uniquindio.comandera.domain.service.TokenService;
import co.edu.uniquindio.comandera.domain.util.RefreshToken;
import jakarta.persistence.EntityManager;

public class RefreshTokenUseCase
{
    private RefreshTokenRepository tokenRepository;
    
    private UserRepository userRepository;
    
    private TokenService tokenService;

    private EntityManager manager;
    
    public RefreshTokenUseCase(
        RefreshTokenRepository tokenRepository,
        UserRepository userRepository,
        TokenService tokenService,
        EntityManager manager
    ) {
        this.tokenRepository = tokenRepository;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.manager = manager;
    }
    
    public AuthTokenReponseDto execute(String token) throws InvalidTokenException
    {
        RefreshToken refreshToken = this.tokenRepository.findByHash(token)
            .orElseThrow(() -> new InvalidTokenException());
        
        if (! refreshToken.getExpiredAt().isAfter(LocalDateTime.now())) {
            throw new InvalidTokenException();
        } else if (
            refreshToken.getRevokedAt() != null
            && refreshToken.getRevokedAt().isBefore(LocalDateTime.now())
        ) {
            throw new InvalidTokenException();
        }

        manager.clear();
        
        User user = this.userRepository
            .findById(refreshToken.getUserId())
            .orElseThrow(() -> new RuntimeException("not found user"));
        
        this.tokenRepository.revokeToken(refreshToken.getId());

        System.out.println("---------------------------------------------");
        System.out.println(user.getClass());
        System.out.println("---------------------------------------------");
        
        String newRefreshToken = this.tokenService.generateRefreshToken(user);
        String newAccessToken = this.tokenService.generateAccessToken(user);
        
        this.tokenRepository.create(new RefreshToken(
            UUID.randomUUID().toString(),
            newRefreshToken,
            LocalDateTime.now(),
            LocalDateTime.now().plusDays(7),
            null,
            user.getId()
        ));
        
        return new AuthTokenReponseDto(newRefreshToken, newAccessToken);
    }
}
