package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.repostories.OrderProductRepository;
import co.edu.uniquindio.comandera.repostories.OrderRepository;
import co.edu.uniquindio.comandera.repostories.ProductRepository;

@Service
public class OrderProductService {
    @Autowired
    private OrderRepository orders;
    
    @Autowired
    private ProductRepository products;

    @Autowired
    private OrderProductRepository repository;
}
