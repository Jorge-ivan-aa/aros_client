package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.OrderEntity;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<OrderEntity, Long> {

    /**
     * Find pending orders from today filtered by preparation area
     */
    @Query("SELECT DISTINCT o FROM OrderEntity o " +
            "WHERE o.completed = false " +
            "AND DATE(o.creation) = CURRENT_DATE " +
            "AND EXISTS (SELECT 1 FROM OrderProductEntity op " +
            "            JOIN op.product p " +
            "            WHERE op.order = o " +
            "            AND p.preparationArea = :area)" +
            "ORDER BY o.creation ASC")
    List<OrderEntity> findPendingOrdersByArea(@Param("area") String area);

}