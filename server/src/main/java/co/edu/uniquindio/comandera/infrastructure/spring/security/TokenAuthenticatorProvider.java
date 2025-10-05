package co.edu.uniquindio.comandera.infrastructure.spring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import co.edu.uniquindio.comandera.domain.service.TokenService;
import co.edu.uniquindio.comandera.infrastructure.spring.security.tokens.AuthenticationToken;
import io.jsonwebtoken.lang.Collections;

public class TokenAuthenticatorProvider implements AuthenticationProvider
{
    @Autowired
    private TokenService service;

    public TokenAuthenticatorProvider() {
    }

    public TokenAuthenticatorProvider(TokenService tokenService) {
        this.service = tokenService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException
    {
        String token = (String) authentication.getCredentials();

        if (this.service.validateAccessToken(token)) {
            return new AuthenticationToken(
                this.service.extractUserInfo(token),
                token,
                Collections.emptyList()
            );
        } else {
            throw new BadCredentialsException("Invalid or expired token");
        }
    }

    @Override
    public boolean supports(Class<?> authentication)
    {
        return AuthenticationToken.class.isAssignableFrom(authentication);
    }
}
