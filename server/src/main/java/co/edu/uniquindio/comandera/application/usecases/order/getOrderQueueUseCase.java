package co.edu.uniquindio.comandera.application.usecases.order;

import co.edu.uniquindio.comandera.application.dto.order.OrderQueueResponseDto;
import co.edu.uniquindio.comandera.domain.repository.UserRepository;
import co.edu.uniquindio.comandera.domain.repository.OrderRepository;

public class getOrderQueueUseCase {
    private OrderRepository orderRepository;
    private UserRepository userRepository;

    public getOrderQueueUseCase(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;

    }

    public OrderQueueResponseDto execute() {
        return null;
    }



}
