package com.cart.ecom_proj.service;

import com.cart.ecom_proj.model.Category;
import com.cart.ecom_proj.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    public List<Category> getActiveCategories() {
        return categoryRepo.findByActive(true);
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepo.findById(id);
    }

    public Optional<Category> getCategoryByName(String name) {
        return categoryRepo.findByName(name);
    }

    public Category createCategory(Category category) {
        if (categoryRepo.existsByName(category.getName())) {
            throw new RuntimeException("Category already exists");
        }
        category.setCreatedAt(new Date());
        return categoryRepo.save(category);
    }

    public Category updateCategory(Long id, Category categoryDetails) {
        Category category = categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        category.setName(categoryDetails.getName());
        category.setDescription(categoryDetails.getDescription());
        category.setIcon(categoryDetails.getIcon());
        category.setActive(categoryDetails.isActive());
        
        return categoryRepo.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }

    public long getTotalCategoriesCount() {
        return categoryRepo.count();
    }
}
