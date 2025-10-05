package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaAreaRepository;

@Repository
public class AreaService {
    @Autowired
    private JpaAreaRepository repository;
}
