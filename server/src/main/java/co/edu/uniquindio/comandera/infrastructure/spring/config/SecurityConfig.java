package co.edu.uniquindio.comandera.infrastructure.spring.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import co.edu.uniquindio.comandera.domain.service.TokenService;
import co.edu.uniquindio.comandera.infrastructure.spring.filters.TokenFilter;
import co.edu.uniquindio.comandera.infrastructure.spring.security.TokenAuthenticatorProvider;
import co.edu.uniquindio.comandera.infrastructure.spring.security.entrypoint.TokenAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig
{
    @Bean
    public SecurityFilterChain securityFilterChain(
        HttpSecurity http,
        TokenFilter filter
    ) throws Exception {
        return http
            .securityMatcher("/api/**")
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(excp -> excp
                .authenticationEntryPoint(new TokenAuthenticationEntryPoint())
            )
            .authorizeHttpRequests(authz -> authz
                .requestMatchers(new String[] { "/api/login", "/api/refresh" }).permitAll()
                .anyRequest().permitAll()
                // .anyRequest().authenticated()
            )
            .build()
        ;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public TokenFilter tokenFilter(
        @Qualifier("handlerExceptionResolver") HandlerExceptionResolver exceptionResolver,
        AuthenticationProvider provider
    ) {
        // AuthenticationProvider provider = new TokenAuthenticatorProvider(
        // );
        
        return new TokenFilter(provider, exceptionResolver);
    }

    @Bean
    public AuthenticationProvider authenticationProvider(
        TokenService tokenService
    ) {
        return new TokenAuthenticatorProvider(tokenService);
    }
}
