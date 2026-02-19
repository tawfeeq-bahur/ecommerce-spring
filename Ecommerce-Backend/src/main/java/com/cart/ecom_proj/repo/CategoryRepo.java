package com.cart.ecom_proj.repo;

import com.cart.ecom_proj.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
    List<Category> findByActive(boolean active);
    boolean existsByName(String name);
}
