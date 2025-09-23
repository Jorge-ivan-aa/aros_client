package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.repostories.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;
}
