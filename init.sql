CREATE TABLE IF NOT EXISTS almacenes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255),
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS productos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DOUBLE PRECISION NOT NULL,
    departamento VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS existencias (
    id BIGSERIAL PRIMARY KEY,
    producto_id BIGINT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
    almacen_id BIGINT NOT NULL REFERENCES almacenes(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT uk_producto_almacen UNIQUE (producto_id, almacen_id)
);

CREATE TABLE IF NOT EXISTS movimientos (
    id BIGSERIAL PRIMARY KEY,
    producto_id BIGINT NOT NULL REFERENCES productos(id),
    tipo VARCHAR(50) NOT NULL,
    cantidad INTEGER NOT NULL,
    almacen_origen_id BIGINT REFERENCES almacenes(id),
    almacen_destino_id BIGINT REFERENCES almacenes(id),
    fecha TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT
);

TRUNCATE TABLE movimientos, existencias, productos, almacenes RESTART IDENTITY CASCADE;

INSERT INTO almacenes (nombre, ubicacion, descripcion) VALUES
('Almacén Central Hermosillo', 'Parque Industrial Hermosillo, Nave 4A', 'Bodega principal de almacenamiento corporativo y distribución regional'),
('Centro de Distribución Nogales', 'Parque Industrial San Ramón, Lote 12', 'Punto de recepción de importaciones y enlace fronterizo'),
('Sucursal Tecnológica Cd. Obregón', 'Av. Miguel Alemán #450, Centro', 'Almacén operativo para abastecimiento del sur de Sonora');

INSERT INTO productos (nombre, descripcion, precio, departamento) VALUES
('Servidor Rack Dell PowerEdge R750', '2x Intel Xeon Gold, 128GB RAM DDR4, 4TB SSD NVMe RAID', 84500.00, 'Servidores & Redes'),
('Switch Administrable Cisco Catalyst 9300', '48 Puertos Gigabit PoE+, 4x 10G SFP+ Uplinks', 32400.00, 'Servidores & Redes'),
('Laptop Lenovo ThinkPad T14 Gen 4', 'Intel Core i7-1365U, 32GB RAM, 1TB SSD, Windows 11 Pro', 24800.00, 'Cómputo'),
('Workstation HP Z2 Tower G9', 'Intel Core i9-13900K, 64GB RAM, RTX A4000 16GB, 2TB SSD', 52900.00, 'Cómputo'),
('Unidad de Almacenamiento NAS Synology DS923+', '4 Bahías, AMD Ryzen R1600, 8GB ECC RAM expandible', 14200.00, 'Almacenamiento'),
('Disco Duro Empresarial Seagate Exos 16TB', 'SATA 6Gb/s, 7200 RPM, 256MB Cache, Operación 24/7', 6800.00, 'Almacenamiento'),
('Monitor Profesional Dell UltraSharp 27" 4K', 'Panel IPS Black, 98% DCI-P3, USB-C Hub 90W PD', 11500.00, 'Periféricos'),
('Sistema UPS APC Smart-UPS 3000VA', 'Montaje en Rack 2U, Onda senoidal pura, LCD inteligente', 27600.00, 'Infraestructura');

INSERT INTO existencias (producto_id, almacen_id, cantidad) VALUES
(1, 1, 3),
(1, 2, 1),
(2, 1, 8),
(2, 2, 4),
(2, 3, 2),
(3, 1, 25),
(3, 2, 15),
(3, 3, 10),
(4, 1, 5),
(4, 2, 2),
(5, 1, 6),
(5, 3, 3),
(6, 1, 40),
(6, 2, 20),
(7, 1, 18),
(7, 3, 8),
(8, 1, 4),
(8, 2, 2);

INSERT INTO movimientos (producto_id, tipo, cantidad, almacen_origen_id, almacen_destino_id, fecha, observaciones) VALUES
(1, 'ENTRADA', 4, NULL, 1, NOW() - INTERVAL '5 days', 'Lote inicial de servidores rack para Wong Industries'),
(1, 'TRANSFERENCIA', 1, 1, 2, NOW() - INTERVAL '3 days', 'Traspaso de equipo a nodo de datos Nogales'),
(3, 'ENTRADA', 50, NULL, 1, NOW() - INTERVAL '4 days', 'Recepción de flota de laptops ThinkPad para proyectos corporativos'),
(3, 'TRANSFERENCIA', 15, 1, 2, NOW() - INTERVAL '2 days', 'Abastecimiento de sucursal frontera Nogales'),
(3, 'TRANSFERENCIA', 10, 1, 3, NOW() - INTERVAL '1 days', 'Abastecimiento de sucursal Obregón'),
(6, 'ENTRADA', 60, NULL, 1, NOW() - INTERVAL '4 days', 'Recepción de lote de discos duros empresariales'),
(6, 'TRANSFERENCIA', 20, 1, 2, NOW() - INTERVAL '2 days', 'Envío de unidades de repuesto a Nogales');
