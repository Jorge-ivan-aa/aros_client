package co.edu.uniquindio.comandera.infrastructure.spring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.service.TokenHasher;

@Service
public class BCryptTokenHasher implements TokenHasher
{
    @Autowired
    private PasswordEncoder encoder;
    
    @Override
    public String hash(String token)
    {
        return this.encoder.encode(token);
    }

    @Override
    public boolean validate(String token, String hashed)
    {
        return this.encoder.matches(token, hashed);
    }
}
