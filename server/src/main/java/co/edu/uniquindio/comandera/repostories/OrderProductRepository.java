package co.edu.uniquindio.comandera.repostories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.springdata.entity.OrderProductEntity;

@Repository
public interface OrderProductRepository extends CrudRepository<OrderProductEntity, Long> {
    // 
}
