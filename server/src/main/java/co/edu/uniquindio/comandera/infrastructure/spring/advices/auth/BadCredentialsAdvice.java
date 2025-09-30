package co.edu.uniquindio.comandera.infrastructure.spring.advices.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BadCredentialsAdvice
{
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> badCredentialsHandler(BadCredentialsException ex)
    {
        Map<String, String> map = new HashMap<>();

        map.put("message", ex.getMessage());
        
        return map;
    }
}
