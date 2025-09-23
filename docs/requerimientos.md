# Requerimientos

### Descripcion proyecto*

Comandera es sistema de tomas de pedidos electronico para restaurantes, el cual busca agilizar los tiempos de entrega de los pedidos aumentando la productividad de los colaboradores. El sistema hace una división de responsabilidades por medio de areas especificas(bar, cocina, servicio), de esta forma el administrador puede asignar areas encargadas a sus miembros de equipo y clasificar los productos segun el area donde se produce.

### Requerimientos

- El mesero puede realizar la toma de un pedido para la cocina con los platos del dia
- el mesero puede realizar la toma de un pedido para el "bar"
- el mesero puede navegar por los pedidos del dia
- el mesero puede cancelar un pedido que no se encuentre completado
- el mesero puede observar los detalles de un pedido especifico
- el jefe de cocina puede visualizar un listado con los pedidos del dia
- el jefe de cocina podra visuzlizar los detalles de un pedido de cocina especifico
- el jefe de cocina puede ver el tiempo de los pedidos
- el jefe de cocina puede puede marcar como completado un pedido de cocina
- el bartender puede ver un listado con los pedidos del dia
- el bartender puede marcar como completado los pedidos del "bar" 
- el administrador puede consultar un resumen del dia
- el administrador puede asignar los platos en el menu del dia (es decir puede asignar productos a la cocina)
- el administrador puede asignar productos en la barra
- el administrador puede ver un listado de los productos
- el administrador puede crear nuevos productos
- el administrador puede eliminar productos
- el administrador puede actualizar nuevos productos
- el adminsitrador puede asignar categorias a los productos
- el administrador puede crear nuevas categorias
- el administrador puede eliminar categorias
- el administrador puede actualizar categorias
- el administrador puede ver un listado de las categorias
- el administrador puede ver los productos bajo un categoria especifica
- el administrador puede asignar un producto a un area
- el administrador podra crear un nuevo empleado
- el administrador podra asignar roles a un empleado
- el administrador podra remover roles a un empleado
- el administrador podra inactivar un empleado
- el administrador podra activar un empleado

### **Reglas de negocio**

- Regla 001: no es posible tener dos (2) productos con el mismo nombre
- Regla 002: no es posible tener repetir categoria en un producto
- Regla 003: un `empleado` puede tener mas de un rol (mesero, bartender, jefe de cocina, etc.)
- Regla 004: el precio de un producto debe ser un numero positivo
- Regla 005: un empleado **inactivo** no podra usar el software
- Regla 006: solo es posible agregar los productos del menu del dia al pedido de cocina
- Regla 007: solo es posible agregar los productos activos a los pedidos del bar
- Regla 008: solo es posible agregar productos del area del bar en los pedidos del bar
- Regla 009: al menu del dia solo se le podran asignar productos activos
- Regla 010: al menu del dia solo se le podran asignar productos del area de cocina
- Regla 011: los empleados deben iniciar sesion para hacer uso del software
