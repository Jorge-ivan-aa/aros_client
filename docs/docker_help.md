# Guía rápida: Docker + MySQL (Comandera)

Este proyecto usa **Docker Compose** para levantar un contenedor con MySQL.  
Solo necesitas tener instalado Docker y Docker Compose.

---

## Comandos esenciales

### 1. Levantar el contenedor
```bash
docker compose up -d
```

### 2. Ver contenedores activos
```bash
docker ps
```

### 3. Aplicar cambios al archivo `.env`
>  Si cambias credenciales en `.env`, debes recrear el contenedor.
```bash
docker compose down -v   # baja y borra volúmenes (incluye datos)
docker compose up -d     # levanta de nuevo con los cambios
```

### 4. Acceder al CLI de MySQL dentro del contenedor
```bash
docker exec -it mysql-comandera mysql -u $MYSQL_USER -p
```
*(usa la contraseña definida en `.env`)*

### 5. Ver logs del contenedor
```bash
docker logs -f mysql-comandera
```

---

## Archivos importantes

- `compose.yml` → configuración de los servicios.
- `.env` → credenciales y variables de entorno.
- `.env.example` → ejemplo de configuración.

## Importante

Antes de levantar el contenedor, se debe crear el fichero .env con las credenciales correspondientes, consultar `.env.example` para ver que datos necesita.
