# Accrox Aros: Sistema de Gestión de Pedidos (Repositorio Cliente)

AROS es un sistema de gestión de pedidos para los restaurantes del siglo XXI. Su objetivo es optimizar tiempos de entrega, reducir costos operativos y aumentar la productividad del personal.

## Tecnologías
Al ser un producto empresarial, buscamos plataformas estables, escalables y con respaldo en el mercado. Por ello elegimos:

- Angular 20
- PrimeNG
- Tailwind CSS

## Estructura del Proyecto

El proyecto sigue una arquitectura modular organizada por responsabilidades:

```
src/app/
├── core/                    # Servicios singleton y configuraciones globales
│   ├── guards/             # Guards de autenticación y autorización
│   ├── interceptors/       # Interceptores HTTP
│   └── services/           # Servicios de aplicación (auth, etc.)
├── areas/                  # Áreas que agrupan features relacionadas
│   ├── public/             # Área pública
│   └── admin/              # Área administrativa
├── shared/                 # Componentes realmente compartidos
│   └── components/         # Componentes reutilizables
├── features/               # Módulos de funcionalidades específicas
│   ├── auth/               # Módulo de autenticación
│   │   ├── authentication/ # Componentes de autenticación
│   │   └── login/          # Página de login
│   └── admin/              # Módulo de administración
│       └── creation/       # Formularios de creación
└── models/                 # Interfaces, DTOs y tipos TypeScript
```

## Guía de Desarrollo

### Cómo Trabajar con la Estructura

#### 1. **Agregar un Nuevo Feature**
Cuando necesites agregar una nueva funcionalidad:

```typescript
// Crear en: features/nombre-feature/
features/
└── mi-nueva-feature/
    ├── mi-nueva-feature.ts      # Componente principal
    ├── mi-nueva-feature.html    # Template
    └── components/              # Sub-componentes específicos
```

#### 2. **Crear Componentes Reutilizables**
Los componentes que pueden usarse en múltiples lugares van en:

```typescript
// Crear en: shared/components/
shared/components/
└── mi-componente/
    ├── mi-componente.ts
    ├── mi-componente.html
    └── mi-componente.css
```

#### 3. **Implementar Áreas**
Las áreas actúan como contenedores que agrupan features relacionadas:

```typescript
// Crear en: areas/
areas/
└── mi-area/
    ├── mi-area.ts              // Contenedor del área
    ├── mi-area.html            // Estructura base + navegación
    └── components/             // Componentes específicos del área
```

Ejemplo de uso en routing:
```typescript
{
  path: 'admin',
  component: AdminArea,          // Área como contenedor
  children: [
    { path: 'products', loadComponent: () => import('./features/admin/products') },
    { path: 'users', loadComponent: () => import('./features/admin/users') }
  ]
}
```

#### 4. **Definir Modelos e Interfaces**
Todas las interfaces y tipos van en:

```typescript
// Crear en: models/
models/
├── user/
│   ├── user.model.ts
│   └── user-role.enum.ts
└── product/
    ├── product.model.ts
    └── product-category.enum.ts
```

#### 5. **Servicios (Todos en Core)**
Todos los servicios van en `core/services/` organizados por dominio:

```typescript
core/services/
├── authentication/    # Servicios de autenticación
├── products/         # Servicios de productos  
├── users/            # Servicios de usuarios
└── [domain]/         # Servicios por dominio de negocio
```

Los features solo contienen componentes, no servicios.
