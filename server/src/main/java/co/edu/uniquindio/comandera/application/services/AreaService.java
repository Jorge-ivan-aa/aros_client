package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.repostories.AreaRepository;

@Repository
public class AreaService {
    @Autowired
    private AreaRepository repository;
}
