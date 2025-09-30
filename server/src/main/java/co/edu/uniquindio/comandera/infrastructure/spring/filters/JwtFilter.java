package co.edu.uniquindio.comandera.infrastructure.spring.filters;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import co.edu.uniquindio.comandera.domain.service.TokenService;
import io.jsonwebtoken.lang.Collections;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter extends OncePerRequestFilter
{
    private TokenService tokenService;
    
    public JwtFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        if (! this.isPermited(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }
        
        String header = request.getHeader("Authorization");
        
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            if (tokenService.validateAccessToken(token)) {
                SecurityContext context = SecurityContextHolder.createEmptyContext();

                context.setAuthentication(new UsernamePasswordAuthenticationToken(
                    tokenService.extractUsername(token),
                    null,
                    Collections.emptyList()
                ));
                
                SecurityContextHolder.setContext(context);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Expired token");
                return;
            }
        }
        
        filterChain.doFilter(request, response);
    }
    
    private boolean isPermited(String uri)
    {
        return ! uri.equals("/api/refresh")
            && ! uri.equals("/api/login");
    }
}
