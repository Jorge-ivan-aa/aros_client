package co.edu.uniquindio.comandera.infrastructure.spring.controllers.order;

import co.edu.uniquindio.comandera.application.dto.auth.AuthTokenReponseDto;
import co.edu.uniquindio.comandera.application.dto.order.OrderQueueResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/api/order/")
public class OrderQueueController {

    @PostMapping(path = "queue")
    public ResponseEntity<OrderQueueResponseDto> getOrderQueue() {
        System.out.print("OrderQueueController.getQueue() called");
        return null;
    }


}
