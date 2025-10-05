package co.edu.uniquindio.comandera.domain.repository;

import co.edu.uniquindio.comandera.domain.model.Order;
import co.edu.uniquindio.comandera.domain.model.Product;
import co.edu.uniquindio.comandera.domain.model.enums.Area;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.OrderEntity;


import java.util.List;
import java.util.Queue;

public interface OrderRepository {

    /**
     * Retrieves all pending orders from today that include at least one product belonging to the specified area.
     *
     * @param area the area to filter products by
     * @return a list of orders matching the criteria
     */
    List<OrderEntity> findPendingOrdersByArea(String area);

}