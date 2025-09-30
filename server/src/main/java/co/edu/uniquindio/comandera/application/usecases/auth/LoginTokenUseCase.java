package co.edu.uniquindio.comandera.application.usecases.auth;

import java.time.LocalDateTime;
import java.util.UUID;

import co.edu.uniquindio.comandera.application.dto.auth.AuthRequestDto;
import co.edu.uniquindio.comandera.application.dto.auth.AuthTokenReponseDto;
import co.edu.uniquindio.comandera.application.exceptions.auth.InvalidCredentialsException;
import co.edu.uniquindio.comandera.domain.model.User;
import co.edu.uniquindio.comandera.domain.model.services.PasswordHasher;
import co.edu.uniquindio.comandera.domain.repository.RefreshTokenRepository;
import co.edu.uniquindio.comandera.domain.repository.UserRepository;
import co.edu.uniquindio.comandera.domain.service.TokenService;
import co.edu.uniquindio.comandera.domain.util.RefreshToken;

public class LoginTokenUseCase
{
    private TokenService tokenService;
    
    private UserRepository userRepository;
    
    private RefreshTokenRepository tokenRepository;
    
    private PasswordHasher passwordHasher;
    
    private Integer refreshTokenDuration;

    public LoginTokenUseCase(
        TokenService tokenService,
        UserRepository userRepository,
        RefreshTokenRepository tokenRepository,
        PasswordHasher passwordHasher,
        Integer refreshTokenDuration
    ) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordHasher = passwordHasher;
        this.refreshTokenDuration = refreshTokenDuration;
    }
    
    public AuthTokenReponseDto execute(AuthRequestDto request) throws InvalidCredentialsException
    {
        User worker = this.userRepository
            .findByEmail(request.getUsername())
            .orElseThrow(() -> new InvalidCredentialsException());
        
        if (! worker.passwordMatches(request.getPassword(), this.passwordHasher)) {
            throw new InvalidCredentialsException();
        }

        String refreshToken = this.tokenService.generateRefreshToken(worker);
        String accessToken = this.tokenService.generateAccessToken(worker);
        
        this.tokenRepository.create(new RefreshToken(
            UUID.randomUUID().toString(),
            refreshToken,
            LocalDateTime.now(),
            LocalDateTime.now().plusHours(refreshTokenDuration),
            null,
            worker.getId()
        ));

        return new AuthTokenReponseDto(refreshToken, accessToken);
    }
}
