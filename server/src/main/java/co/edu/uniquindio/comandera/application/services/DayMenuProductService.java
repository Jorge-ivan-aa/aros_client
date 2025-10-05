package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.DayMenuProductRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.DayMenuRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.JpaProductRepository;

@Service
public class DayMenuProductService {
    @Autowired
    private JpaProductRepository products;

    @Autowired
    private DayMenuRepository menus;

    @Autowired
    private DayMenuProductRepository repository;
}
