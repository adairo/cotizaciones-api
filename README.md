## Descripción del problema

En el Área de mercadeo, se requiere realizar micro servicios de cotización de productos a crédito, el cual debe contar con 3 secciones:

1. Sección de administración de productos.

- se requiere crear un micro servicio para que el usuario pueda agregar, editar, eliminar cualquier producto de la base de datos, dichos productos deben contar al menos con los campos de SKU, nombre o descripción y precio.

2. Sección de administración de plazos.

- se requiere crear un micro servicio que el usuario pueda dar de alta plazos semanales con sus respectivas tasas(intereses), Ejemplo: para plazo a 12 semanas se cobrara una tasa normal de 1.0366 y una puntual de 0.8963.

3. Sección de cotización de créditos.

- Búsqueda de productos a través de SKU(ID) o nombre.
- Consultar los plazos que existen.
- Generar cotización enviando el plazo y sKU deberá mostrar el abono Normal semanal y el abono puntual en base a la siguiente formula.
  - Abono Normal ---- ((Precio del producto \_ tasa normal) + Precio del producto) / plazo
  - Abono Puntual ---- ((Precio del producto \_ tasa puntual) + Precio del producto) / plazo

## Desarrollo

Se iniciará con el diseño de la base de datos. El primer paso será identificar las entidades involucradas en este problema. Analizando la descripción podemos observar 2 entidades principales:

1. Productos
2. Plazos

La entidad Productos contendrá los siguientes atributos:

- sku
- nombre
- precio

La entidad Plazos contendrá los siguientes atributos:

- plazo_semanas
- tasa_normal
- tasa_puntual

En la descripción del problema quizá no queda muy claro si los plazos son específicos de cada producto o son generales de cualquier producto. Para simplicidad del ejercicio, se asume la segunda opción, es decir, existe un solo conjunto de plazos que aplican para todos los productos.

## Base de datos

```sql
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(16) UNIQUE NOT NULL, -- text or anything else?
    nombre VARCHAR(50) NOT NULL,
    precio NUMERIC NOT NULL DEFAULT 0.0
);

CREATE TABLE plazos (
    id SERIAL PRIMARY KEY,
    plazo_semanas INT,
    tasa_normal NUMERIC NOT NULL,
    tasa_puntual NUMERIC NOT NULL CHECK (tasa_puntual < tasa_normal)
);

-- Insertar algunos valores de prueba
INSERT INTO productos (sku, nombre, precio) VALUES
  ('a1b2c3dd4', 'Samsung Galaxy S45 16GB 10TB', 45000.50),
  ('b2b3c5dd5', 'Motorola Moto45 12GB 8TB', 54200.0),
  ('c3b4c3dd6', 'Xiaomi Mi45 18GB 15TB', 32500.50);

```
