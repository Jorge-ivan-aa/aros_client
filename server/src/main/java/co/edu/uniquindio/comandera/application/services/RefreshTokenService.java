package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaRefreshTokenRepository;

@Service
public class RefreshTokenService {
    @Autowired
    private JpaRefreshTokenRepository repository;
}
