-- Limpiar tablas (en orden inverso por foreign keys)
DELETE FROM order_products;
DELETE FROM table_id;
DELETE FROM orders;
DELETE FROM worker_areas;
DELETE FROM workers;
DELETE FROM administrators;
DELETE FROM refresh_tokens;
DELETE FROM users;
DELETE FROM product_categories;
DELETE FROM daymenu_products;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM areas;
DELETE FROM tables;
DELETE FROM daymenus;

-- Insertar áreas de preparación
INSERT INTO areas (id, name, type) VALUES
(1, 'COCINA', 'PRODUCTS'),
(2, 'BAR', 'PRODUCTS'),
(3, 'PARRILLA', 'PRODUCTS');

-- Insertar categorías
INSERT INTO categories (id, name) VALUES
(1, 'Platos Fuertes'),
(2, 'Bebidas'),
(3, 'Entradas'),
(4, 'Postres');

-- Insertar productos
INSERT INTO products (id, name, description, price, image, estimate_time, preparation_area) VALUES
-- Productos COCINA
(1, 'Hamburguesa Especial', 'Hamburguesa con queso y tocino', 15000, 'hamburguesa.jpg', 15, 1),
(2, 'Pizza Margarita', 'Pizza con tomate y mozzarella', 20000, 'pizza.jpg', 20, 1),
(3, 'Ensalada César', 'Ensalada con pollo y aderezo césar', 10000, 'ensalada.jpg', 10, 1),

-- Productos BAR
(4, 'Cerveza Artesanal', 'Cerveza rubia artesanal', 8000, 'cerveza.jpg', 5, 2),
(5, 'Margarita Clásica', 'Cóctel de tequila y limón', 12000, 'margarita.jpg', 8, 2),
(6, 'Café Americano', 'Café negro americano', 5000, 'cafe.jpg', 3, 2),

-- Productos PARRILLA
(7, 'Costillas BBQ', 'Costillas de cerdo en salsa BBQ', 25000, 'costillas.jpg', 25, 3);

-- Relacionar productos con categorías
INSERT INTO product_categories (product_id, category_id) VALUES
(1, 1),
(2, 1),
(3, 3),
(4, 2),
(5, 2),
(6, 2),
(7, 1);

-- Insertar mesas
INSERT INTO tables (id, name, enable) VALUES
(1, 'Mesa 1', true),
(2, 'Mesa 2', true),
(3, 'Mesa 3', true),
(4, 'Mesa 4', true);

-- Insertar usuarios
INSERT INTO users (id, name, email, password) VALUES
(1, 'Carlos Admin', 'carlos@restaurante.com', '$2a$10$GwLP1vlsW9HMSiSZ257laOIs2PnZzf1nXLxmLR1Hj1.A7cPpfC9Oy'),
(2, 'Maria Bartender', 'maria@restaurante.com', '$2a$10$GwLP1vlsW9HMSiSZ257laOIs2PnZzf1nXLxmLR1Hj1.A7cPpfC9Oy'),
(3, 'Pedro Parrillero', 'pedro@restaurante.com', '$2a$10$GwLP1vlsW9HMSiSZ257laOIs2PnZzf1nXLxmLR1Hj1.A7cPpfC9Oy'),
(4, 'Ana Mesera', 'ana@restaurante.com', '$2a$10$GwLP1vlsW9HMSiSZ257laOIs2PnZzf1nXLxmLR1Hj1.A7cPpfC9Oy');

-- Insertar workers
INSERT INTO workers (id, identification, phone, address, image, observations, enable) VALUES
(2, '987654321', '3004445566', 'Carrera 456', 'maria.jpg', 'Bartender experta', true),
(3, '456789123', '3007778899', 'Avenida 789', 'pedro.jpg', 'Especialista en parrilla', true),
(4, '789123456', '3002223344', 'Diagonal 012', 'ana.jpg', 'Mesera', true);

INSERT INTO administrators (id) VALUES
(1);

-- Relacionar workers con áreas
INSERT INTO worker_areas (worker_id, area_id) VALUES
-- (1, 1), -- Carlos trabaja en COCINA
(2, 2), -- Maria trabaja en BAR
(3, 3), -- Pedro trabaja en PARRILLA
(4, 1), -- Ana también puede trabajar en COCINA
(4, 2); -- Ana también puede trabajar en BAR

-- Insertar orders (pedidos)
INSERT INTO orders (id, creation, total, completed, table_id, worker_id) VALUES
-- Orders de hoy PENDIENTES (completed = false)
(1, NOW(), 23000, false, 1, 4),  -- Order 1: Mesa 1, atendida por Ana
(2, NOW(), 20000, false, 2, 4),  -- Order 2: Mesa 2, atendida por Ana
(3, NOW(), 35000, false, 3, 4),  -- Order 3: Mesa 3, atendida por Ana
-- Order de hoy COMPLETADA (completed = true) - no debería aparecer
(4, NOW(), 15000, true, 1, 4),
-- Order de AYER PENDIENTE (no debería aparecer en consultas de hoy)
(5, NOW() - INTERVAL 1 DAY, 18000, false, 4, 4);

-- Insertar order_products
INSERT INTO order_products (id, order_id, product_id, name, price, quantity, image) VALUES
-- Order 1 (COCINA) - Hamburguesa + Ensalada
(1, 1, 1, 'Hamburguesa Especial', 15000, 1, 'hamburguesa.jpg'),
(2, 1, 3, 'Ensalada César', 10000, 1, 'ensalada.jpg'),

-- Order 2 (BAR) - Cerveza + Margarita
(3, 2, 4, 'Cerveza Artesanal', 8000, 2, 'cerveza.jpg'),
(4, 2, 5, 'Margarita Clásica', 12000, 1, 'margarita.jpg'),

-- Order 3 (COCINA + BAR) - Pizza + Café
(5, 3, 2, 'Pizza Margarita', 20000, 1, 'pizza.jpg'),
(6, 3, 6, 'Café Americano', 5000, 3, 'cafe.jpg'),

-- Order 4 (completada) - Hamburguesa
(7, 4, 1, 'Hamburguesa Especial', 15000, 1, 'hamburguesa.jpg'),

-- Order 5 (de ayer) - Cerveza
(8, 5, 4, 'Cerveza Artesanal', 8000, 1, 'cerveza.jpg');

-- Relacionar orders con tables (si es necesario según tu tabla table_id)
INSERT INTO table_id (table_entity_id, orders_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 4),
(4, 5);
