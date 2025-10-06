package co.edu.uniquindio.comandera.application.usecases.order;
import co.edu.uniquindio.comandera.domain.model.enums.ProductStatus;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.OrderEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.OrderProductEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

public class CompleteOrderUseCase {
    public CompleteOrderUseCase() {}

    /*
    USE CASE MARK AS COMPLETED ORDER
     * @Transactional
    public boolean completeOrder(OrderEntity order) {
        Set<OrderProductEntity> products = order.getProducts();
        boolean allCompleted = products.stream().allMatch(p -> p.getProduct().getStatus() == ProductStatus.COMPLETED);
        if (allCompleted) {
            order.setCompleted(true);
            return true;
        }
        return false;
    }
     */
}
