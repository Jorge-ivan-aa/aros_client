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

public class RefreshTokenUseCase
{
    private RefreshTokenRepository tokenRepository;
    
    private UserRepository userRepository;
    
    private TokenService tokenService;
    
    public RefreshTokenUseCase(
        RefreshTokenRepository tokenRepository,
        UserRepository userRepository,
        TokenService tokenService
    ) {
        this.tokenRepository = tokenRepository;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
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
        
        User user = this.userRepository.findById(refreshToken.getUserId())
            .orElseThrow(() -> new RuntimeException("not found user"));
        
        this.tokenRepository.revokeToken(refreshToken.getId());
        
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
