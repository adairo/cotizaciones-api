# Cotizaciones API

En este proyecto se implementa una API rest para la gestión de productos, plazos, y la generación de cotizaciones de crédito.
La aplicación está escrita en Nodejs y utiliza Express para definir las rutas y métodos disponibles sobre cada recurso.
Para la base de datos se decidió utilizar PostgreSQL bajo la librería `pg-node`. Además se utiliza `zod` para la creación
y validación de schemas sobre las solicitudes entrantes. 

Haz click aquí para [ver la documentación openapi de este proyecto (swagger)](https://cotizaciones-api-production.up.railway.app/)
El servidor que atiende las solicitudes se encuentra en el mismo dominio, pero en el directorio `/api`. Por ejemplo, para obtener una
lista de todos los productos disponibles, se debe hacer una petición GET al recurso https://cotizaciones-api-production.up.railway.app/api/productos

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

## Desarrollo de la base de datos

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

Se asumirá que para cada producto se deben registrar sus respectivos plazos

A continuación se muestra el código para configurar la base de datos
```sql
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(16) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    precio NUMERIC NOT NULL DEFAULT 0.0
);

CREATE TABLE plazos (
    id SERIAL PRIMARY KEY,
    plazo_semanas INT NOT NULL, -- No. de semanas.
    producto_id INT REFERENCES productos(id) NOT NULL,
    tasa_normal NUMERIC NOT NULL,
    tasa_puntual NUMERIC NOT NULL
      CHECK (tasa_puntual < tasa_normal),
    UNIQUE (producto_id, plazo_semanas) -- un solo plazo para cada producto
);

-- Insertar algunos valores de prueba
INSERT INTO productos (sku, nombre, precio) VALUES
  ('a1b2c3dd4', 'Samsung Galaxy S45 16GB 10TB', 45000.50),
  ('b2b3c5dd5', 'Motorola Moto45 12GB 8TB', 54200.0),
  ('c3b4c3dd6', 'Xiaomi Mi45 18GB 15TB', 32500.50),
  ('d4b5c3dd7', 'Apple Iphone i45 10GB 10TB', 65000.50);

-- Agregar plazos para Samsung Galaxy S45
INSERT INTO plazos (
  producto_id, 
  plazo_semanas, 
  tasa_normal, 
  tasa_puntual
)
VALUES
  ((SELECT productos.id FROM productos
    WHERE productos.sku = 'a1b2c3dd4'),
    1, 1.0032, 0.5763),
  ((SELECT productos.id FROM productos
    WHERE productos.sku = 'a1b2c3dd4'),
    3, 1.0146, 0.6863),
  ((SELECT productos.id FROM productos
    WHERE productos.sku = 'a1b2c3dd4'),
    6, 1.0256, 0.7863),
  ((SELECT productos.id FROM productos
    WHERE productos.sku = 'a1b2c3dd4'),
    12, 1.0366, 0.8963);
```

## Endpoints

Para conocer todos los detalles y opciones disponibles para cada recurso, visita la [documentación openapi de este proyecto (swagger)](https://cotizaciones-api-production.up.railway.app/) 