package com.cart.ecom_proj.service;

import com.cart.ecom_proj.model.Order;
import com.cart.ecom_proj.model.OrderItem;
import com.cart.ecom_proj.model.User;
import com.cart.ecom_proj.repo.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    public List<Order> getAllOrders() {
        return orderRepo.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepo.findById(id);
    }

    public Optional<Order> getOrderByNumber(String orderNumber) {
        return orderRepo.findByOrderNumber(orderNumber);
    }

    public List<Order> getOrdersByUser(User user) {
        return orderRepo.findByUser(user);
    }

    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepo.findByStatus(status);
    }

    public Order createOrder(Order order) {
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setCreatedAt(new Date());
        order.setUpdatedAt(new Date());
        
        // Set order reference in items
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }
        
        return orderRepo.save(order);
    }

    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setStatus(status);
        order.setUpdatedAt(new Date());
        
        return orderRepo.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepo.deleteById(id);
    }

    public long getTotalOrdersCount() {
        return orderRepo.count();
    }

    public BigDecimal getTotalRevenue() {
        BigDecimal revenue = orderRepo.getTotalRevenue();
        return revenue != null ? revenue : BigDecimal.ZERO;
    }

    public Long getOrdersCountByStatus(Order.OrderStatus status) {
        return orderRepo.countByStatus(status);
    }
}
