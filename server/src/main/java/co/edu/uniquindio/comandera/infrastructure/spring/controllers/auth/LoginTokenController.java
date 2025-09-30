package co.edu.uniquindio.comandera.infrastructure.spring.controllers.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.uniquindio.comandera.application.dto.auth.AuthRequestDto;
import co.edu.uniquindio.comandera.application.dto.auth.AuthTokenReponseDto;
import co.edu.uniquindio.comandera.application.exceptions.auth.InvalidCredentialsException;
import co.edu.uniquindio.comandera.application.exceptions.auth.InvalidTokenException;
import co.edu.uniquindio.comandera.application.usecases.auth.LoginTokenUseCase;
import co.edu.uniquindio.comandera.application.usecases.auth.RefreshTokenUseCase;

@RestController()
@RequestMapping(path = "/api/")
public class LoginTokenController
{
    @Autowired
    private LoginTokenUseCase loginUseCase;
    
    @Autowired
    private RefreshTokenUseCase refreshUseCase;

    // @Autowired
    // private JpaUserRepository rep;
    
    @PostMapping(path = "login")
    public ResponseEntity<AuthTokenReponseDto> login(
        @RequestBody AuthRequestDto request
    ) throws InvalidCredentialsException {
        return ResponseEntity.ofNullable(this.loginUseCase.execute(request));
    }
    
    @PostMapping(path = "refresh")
    public ResponseEntity<AuthTokenReponseDto> refresh(
        @RequestHeader String authorization
    ) throws InvalidTokenException {
        if (authorization == null || ! authorization.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }
        
        String token = authorization.substring(7);
        
        return ResponseEntity.ofNullable(this.refreshUseCase.execute(token));
    }
    
    @RequestMapping(path = "proof")
    public Object ah(Authentication auth)
    {
        return auth;
    }
}
