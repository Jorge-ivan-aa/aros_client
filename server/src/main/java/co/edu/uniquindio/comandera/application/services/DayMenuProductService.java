package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.repostories.DayMenuProductRepository;
import co.edu.uniquindio.comandera.repostories.DayMenuRepository;
import co.edu.uniquindio.comandera.repostories.ProductRepository;

@Service
public class DayMenuProductService {
    @Autowired
    private ProductRepository products;

    @Autowired
    private DayMenuRepository menus;

    @Autowired
    private DayMenuProductRepository repository;
}
