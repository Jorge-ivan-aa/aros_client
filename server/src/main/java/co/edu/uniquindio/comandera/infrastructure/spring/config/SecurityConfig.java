package co.edu.uniquindio.comandera.infrastructure.spring.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import co.edu.uniquindio.comandera.domain.repository.UserRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.filters.TokenFilter;
import co.edu.uniquindio.comandera.infrastructure.spring.security.UserDetailsServiceAdapter;
import co.edu.uniquindio.comandera.infrastructure.spring.security.entrypoint.TokenAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
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
                .anyRequest().authenticated()
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
        AuthenticationProvider provider,
        @Qualifier("handlerExceptionResolver") HandlerExceptionResolver exceptionResolver
    ) {
        return new TokenFilter(provider, exceptionResolver);
    }
    
    @Bean
    public UserDetailsService userDetailsService(UserRepository repository)
    {
        return new UserDetailsServiceAdapter(repository);
    }
}
