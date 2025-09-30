package co.edu.uniquindio.comandera.infrastructure.spring.config.beans;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import co.edu.uniquindio.comandera.domain.service.TokenService;
import co.edu.uniquindio.comandera.infrastructure.jwt.JwtService;

@Configuration
public class TokensBeanConfig
{
    @Bean
    public TokenService tokenService(
        @Value("${security.jwt.refresh.secret}")
        String refreshTokenSecret,
        @Value("${security.jwt.access.secret}")
        String accessTokenSecret
    ) {
        return new JwtService(refreshTokenSecret, accessTokenSecret);
    }
}
