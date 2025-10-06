package co.edu.uniquindio.comandera.domain.repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.OrderEntity;
import java.util.List;

public interface OrderRepository {

    /**
     * Retrieves all pending orders from today that include at least one product belonging to the specified area.
     *
     * @param area the area to filter products by
     * @return a list of orders matching the criteria
     */
    List<OrderEntity> findPendingOrdersByArea(String area);

}