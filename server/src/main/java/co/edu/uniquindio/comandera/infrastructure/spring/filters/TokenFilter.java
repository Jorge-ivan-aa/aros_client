package co.edu.uniquindio.comandera.infrastructure.spring.filters;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import co.edu.uniquindio.comandera.infrastructure.spring.security.tokens.AuthenticationToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// @Component
public class TokenFilter extends OncePerRequestFilter
{
    private AuthenticationProvider authentication;
    
    private HandlerExceptionResolver exceptionResolver;
    
    public TokenFilter(AuthenticationProvider provider, HandlerExceptionResolver exceptionResolver)
    {
        this.authentication = provider;
        this.exceptionResolver = exceptionResolver;
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

            try {
                Authentication auth = authentication.authenticate(new AuthenticationToken(token));
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(auth);
                SecurityContextHolder.setContext(context);
            } catch (AuthenticationException ex) {
                SecurityContextHolder.clearContext();
                exceptionResolver.resolveException(request, response, null, ex);
                
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
