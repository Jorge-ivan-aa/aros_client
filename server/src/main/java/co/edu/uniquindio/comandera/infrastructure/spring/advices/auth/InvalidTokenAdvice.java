package co.edu.uniquindio.comandera.infrastructure.spring.advices.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import co.edu.uniquindio.comandera.application.exceptions.auth.InvalidTokenException;

@RestControllerAdvice
public class InvalidTokenAdvice
{
    @ExceptionHandler(InvalidTokenException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> invalidTokenHandler(InvalidTokenException ex)
    {
        Map<String, String> map = new HashMap<>();

        map.put("message", ex.getMessage());
        
        return map;
    }
}
