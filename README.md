# Sistema de Gestión de Inventario y Almacenes

Aplicación web empresarial multi-contenedor para el control y la trazabilidad de inventarios y almacenes de **Wong Industries**, una compañía tecnológica.

**Autor:** Efren Alejandro Gonzalez · [@Nfren4563](https://github.com/Nfren4563) · 
Carlos Armando Santa Cruz Velarde · 
Diego Torres Salas

---

## Descripción

El sistema administra el catálogo de equipo tecnológico, distribuye las existencias entre sucursales y registra operaciones de stock auditables: entradas, salidas, ajustes y transferencias entre almacenes con soporte transaccional.

Todos los componentes están desacoplados y orquestados con Docker Compose, y se pueden desplegar sobre Ubuntu Server.

## Funciones principales

- Gestión de productos tecnológicos: servidores, redes, cómputo y almacenamiento.
- Administración de sucursales y centros de distribución: Hermosillo, Nogales y Cd. Obregón.
- Control de existencias físicas por almacén en tiempo real.
- Registro de movimientos auditables: entradas, salidas, ajustes y transferencias.
- Transferencias atómicas entre almacenes con validación transaccional (`@Transactional`).
- Prevención de stock negativo y validaciones estrictas de datos.
- Interfaz web moderna, limpia y responsiva.
- Carga automática del catálogo y de los datos iniciales (`init.sql`).
- Scripts para respaldar (`backup.sh`) y restaurar (`restore.sh`) la base de datos.
- Pipeline de integración continua con `Jenkinsfile`.

## Arquitectura y tecnologías

El sistema se compone de tres servicios desacoplados dentro de una red privada de Docker:

| Servicio | Contenedor | Tecnologías |
|---|---|---|
| Servidor web y proxy | `inventario-nginx` | NGINX, proxy inverso en el puerto 80 hacia la API interna |
| Backend | `inventario-app` | Java 25, Spring Boot 4, Spring Data JPA, Hibernate, Jakarta Validation, Maven |
| Base de datos | `inventario-db` | PostgreSQL 17 con volumen persistente |

- **Frontend:** React, TypeScript, Vite y Tailwind CSS.
- **DevOps y entorno:** Docker, Docker Compose, Ubuntu Server, Git y Jenkins.

## Requisitos

- Linux (se recomienda Ubuntu Server) o Windows con Docker instalado.
- **Docker Engine** v24 o superior.
- **Docker Compose** v2 o superior.
- Puerto `80` libre en el anfitrión, para acceder a la aplicación web.

## Despliegue rápido

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/Nfren4563/servidoresII-proyectoSpring.git
   cd servidoresII-proyectoSpring
   ```

2. **Configura las variables de entorno:**

   ```bash
   cp .env.example .env
   ```

3. **Construye y levanta los contenedores:**

   ```bash
   docker compose up -d --build
   ```

4. **Verifica el estado de los servicios:**

   ```bash
   docker compose ps
   ```

Cuando `inventario-nginx`, `inventario-app` e `inventario-db` aparezcan en estado `Up`, abre el navegador en:

```
http://localhost
```

También puedes usar la dirección IP de tu servidor Ubuntu, por ejemplo `http://192.168.1.50`.

## Respaldos de la base de datos

Los scripts de Bash de la carpeta `scripts/` respaldan y restauran la información de PostgreSQL.

**Realizar un respaldo:**

```bash
chmod +x scripts/backup.sh
./scripts/backup.sh
```

Genera un archivo `.sql` con fecha en la carpeta `./backups/`.

**Restaurar un respaldo:**

```bash
chmod +x scripts/restore.sh
./scripts/restore.sh ./backups/tu_archivo_de_respaldo.sql
```

**Detener el Sistema**

  Para detener y apagar los contenedores conservando la información de la base de datos intacta:

    docker compose down
