-- Admin User (password: admin123)
INSERT INTO users (email, password, first_name, last_name, phone, address, role, blocked, created_at, updated_at) VALUES
('admin@elegance.com', 'admin123', 'Admin', 'User', '9876543210', 'Store HQ, Mumbai', 'ADMIN', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Sample Users
INSERT INTO users (email, password, first_name, last_name, phone, address, role, blocked, created_at, updated_at) VALUES
('priya@example.com', 'user123', 'Priya', 'Sharma', '9876543211', '123 MG Road, Bangalore', 'USER', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('anita@example.com', 'user123', 'Anita', 'Patel', '9876543212', '456 Park Street, Kolkata', 'USER', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('deepa@example.com', 'user123', 'Deepa', 'Kumar', '9876543213', '789 Anna Nagar, Chennai', 'USER', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Categories
INSERT INTO category (name, description, icon, active, created_at) VALUES
('Dresses', 'Beautiful dresses for every occasion', '👗', true, CURRENT_TIMESTAMP),
('Tops', 'Stylish tops and blouses', '👚', true, CURRENT_TIMESTAMP),
('Bottoms', 'Pants, skirts, and more', '👖', true, CURRENT_TIMESTAMP),
('Ethnic Wear', 'Traditional Indian wear', '🥻', true, CURRENT_TIMESTAMP),
('Western Wear', 'Contemporary western fashion', '👘', true, CURRENT_TIMESTAMP),
('Party Wear', 'Glamorous party outfits', '✨', true, CURRENT_TIMESTAMP),
('Casual Wear', 'Comfortable everyday clothing', '👕', true, CURRENT_TIMESTAMP),
('Formal Wear', 'Professional office attire', '👔', true, CURRENT_TIMESTAMP);

-- Sample Orders
INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, shipping_city, shipping_pincode, payment_method, payment_completed, status, subtotal, discount, shipping_cost, total, created_at, updated_at) VALUES
('ORD-ABC12345', 'Priya Sharma', 'priya@example.com', '9876543211', '123 MG Road', 'Bangalore', '560001', 'card', true, 'DELIVERED', 2999.00, 0, 0, 2999.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ORD-DEF67890', 'Anita Patel', 'anita@example.com', '9876543212', '456 Park Street', 'Kolkata', '700001', 'upi', true, 'SHIPPED', 4599.00, 500, 0, 4099.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ORD-GHI11111', 'Deepa Kumar', 'deepa@example.com', '9876543213', '789 Anna Nagar', 'Chennai', '600001', 'cod', false, 'PENDING', 1999.00, 0, 49, 2048.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
