package com.cart.ecom_proj.controller;

import com.cart.ecom_proj.model.Order;
import com.cart.ecom_proj.model.OrderItem;
import com.cart.ecom_proj.model.Product;
import com.cart.ecom_proj.service.OrderService;
import com.cart.ecom_proj.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177"})
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            // Calculate totals for each item
            BigDecimal subtotal = BigDecimal.ZERO;
            for (OrderItem item : order.getItems()) {
                Product product = productService.getProductById(item.getProduct().getId());
                if (product != null) {
                    item.setProductName(product.getName());
                    item.setPrice(product.getPrice());
                    BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                    item.setTotal(itemTotal);
                    subtotal = subtotal.add(itemTotal);
                }
            }
            
            order.setSubtotal(subtotal);
            if (order.getDiscount() == null) {
                order.setDiscount(BigDecimal.ZERO);
            }
            if (order.getShippingCost() == null) {
                order.setShippingCost(subtotal.compareTo(new BigDecimal("999")) >= 0 ? BigDecimal.ZERO : new BigDecimal("49"));
            }
            
            BigDecimal total = subtotal.subtract(order.getDiscount()).add(order.getShippingCost());
            order.setTotal(total);
            
            Order savedOrder = orderService.createOrder(order);
            return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/orders/{orderNumber}")
    public ResponseEntity<?> getOrderByNumber(@PathVariable String orderNumber) {
        return orderService.getOrderByNumber(orderNumber)
                .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
