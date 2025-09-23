CREATE DATABASE `comandera_db` CHARACTER SET utf8mb4 COLLATE utf8_spanish_ci;

CREATE TABLE IF NOT EXISTS `workers` (
  `identification` VARCHAR(15) NOT NULL PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  `image` VARCHAR(255) NULL,
  `address` TINYTEXT NULL,
  `observations` TINYTEXT NULL,
  `enable` BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS `areas` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `type` VARCHAR(30) NOT NULL, -- work, preparation

  PRIMARY KEY (`id`),
  UNIQUE (`name`, `type`)
);

CREATE TABLE IF NOT EXISTS `admins` (
  `id` BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS `products` (
  `id` BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL UNIQUE,
  `price` FLOAT(8, 2) NOT NULL,
  `description` TEXT NULL,
  `estimate_time` TINYINT NULL,
  `preparation_area` BIGINT(20) NOT NULL,
  `status` VARCHAR(30) NOT NULL,
  `prepare_for` DATETIME NULL,
  `image` VARCHAR(255) NULL,

  FOREIGN KEY (`preparation_area`) REFERENCES `areas` (`id`)
);

CREATE TABLE IF NOT EXISTS `categories` (
  `id` BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS `tables` (
  `id` BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `enable` BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS `orders` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `total` FLOAT(9, 2) NOT NULL,
  `worker_id` VARCHAR(15) NULL,
  `table_id` VARCHAR(20) NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`worker_id`) REFERENCES `workers` (`identification`) ON DELETE SET NULL,
  FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS `daymenus` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `creation` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
);

-- relation tables --

CREATE TABLE IF NOT EXISTS `worker_areas` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `worker_id` VARCHAR(15) NOT NULL,
  `area_id` BIGINT(20) NOT NULL,

  UNIQUE (`worker_id`, `area_id`),

  PRIMARY KEY (`id`),
  FOREIGN KEY (`worker_id`) REFERENCES `workers` (`identification`) ON DELETE CASCADE,
  FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT(20) NOT NULL,
  `category_id` BIGINT(20) NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `daymenu_products` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `daymenu_id` BIGINT(20) NOT NULL,
  `product_id` BIGINT(20) NOT NULL,
  `quantity` TINYINT UNSIGNED NOT NULL DEFAULT(1),

  PRIMARY KEY (`id`) 
  UNIQUE (`daymenu_id`, `product_id`)
  FOREIGN KEY (`daymenu_id`) REFERENCES `daymenus` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `order_products` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `order_id` BIGINT(20) NOT NULL,
  `product_id` BIGINT(20) NOT NULL,
  `quantity` TINYINT UNSIGNED NOT NULL DEFAULT(1),
  `name` VARCHAR(150) NOT NULL UNIQUE,
  `price` FLOAT(8, 2) NOT NULL,
  `image` VARCHAR(255) NULL,

  PRIMARY KEY (`id`)
  UNIQUE (`order_id`, `product_id`) 
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `productss` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `worker_id` BIGINT(20) NULL,
  `token` VARCHAR(500) NOT NULL,

  PRIMARY KEY (`id`)
  UNIQUE (`worker_id`, `token`)
  FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`)
);
