package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.repostories.TableRepository;

@Service
public class TableService {
    @Autowired
    private TableRepository repository;
}
