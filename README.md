# API SellAll - Documentación

## 📋 Descripción

API REST para el sistema de ventas SellAll. Proporciona endpoints para autenticación de usuarios, gestión de productos y carrito de compras.

## 🛠 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DBNAME="SellAll"
DBPASSWORD="tu_password"
DBUSER="tu_usuario"
secretkey="tu_secret_key"
URL_LOCAL="http://localhost:5173"
URL_DEPLOY="https://tu-dominio.com"
N8N_TEST="https://tu-n8n.app/webhook-test/Send-Welcome"
N8N_PRODUCTION="https://tu-n8n.app/webhook/Send-Welcome"
```

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Iniciar en producción
npm start
```

## 🔐 Endpoints de Autenticación

### Registro de Usuario

```http
POST /register
```

**Body:**

```json
{
  "name": "Usuario Ejemplo",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa:**

```json
{
  "id": "user_id",
  "name": "Usuario Ejemplo",
  "email": "usuario@ejemplo.com"
}
```

### Login

```http
POST /login
```

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa:**

```json
{
  "id": "user_id",
  "name": "Usuario Ejemplo",
  "email": "usuario@ejemplo.com"
}
```

### Perfil de Usuario

```http
GET /profile
```

**Headers requeridos:**

- Cookie: token=jwt_token

### Cerrar Sesión

```http
POST /logout
```

### Verificar Token

```http
GET /verify
```

## 🛍 Endpoints de Productos

### Obtener Todos los Productos

```http
GET /products
```

### Obtener un Producto

```http
GET /products/:id
```

### Crear Producto (requiere autenticación)

```http
POST /products
```

**Body:**

```json
{
  "name": "Producto Ejemplo",
  "description": "Descripción del producto",
  "price": 99.99,
  "stock": 100
}
```

## 🛒 Endpoints del Carrito

### Obtener Carrito

```http
GET /cart
```

### Añadir al Carrito

```http
POST /cart/add
```

**Body:**

```json
{
  "productId": "product_id",
  "quantity": 1
}
```

### Actualizar Cantidad

```http
PUT /cart/update
```

**Body:**

```json
{
  "productId": "product_id",
  "quantity": 2
}
```

### Eliminar del Carrito

```http
DELETE /cart/remove/:productId
```

## 🔒 Seguridad

- Todas las contraseñas se hashean con bcrypt
- Autenticación mediante JWT
- Cookies HttpOnly para mayor seguridad
- CORS configurado para los dominios permitidos
- Rate limiting en intentos de login

## 📧 Notificaciones

- Envío automático de correo de bienvenida al registrarse
- Integración con n8n para automatización de correos
- Diferentes webhooks para desarrollo y producción

## ⚙️ Características Técnicas

- Node.js con Express
- MongoDB como base de datos
- JWT para autenticación
- Bcrypt para hash de contraseñas
- CORS habilitado
- Manejo de cookies seguras
- Integración con n8n para automatización

## 🚀 Despliegue

1. Configura las variables de entorno
2. Asegúrate de tener MongoDB configurado
3. Configura los webhooks de n8n
4. Ejecuta `npm install` para las dependencias
5. Inicia con `npm start`

## 📝 Notas Importantes

- En producción, asegúrate de usar HTTPS
- Las cookies requieren configuración específica en producción
- Los correos de bienvenida son asíncronos
- La API usa rate limiting para prevenir ataques

## 🔧 Solución de Problemas Comunes

1. **Error de CORS**: Verifica URL_LOCAL y URL_DEPLOY en .env
2. **Cookies no funcionan**: Revisa configuración de sameSite y secure
3. **Correos no llegan**: Verifica webhooks de n8n
4. **Problemas de autenticación**: Revisa secretkey y configuración de JWT

## 📚 Ejemplos de Uso con fetch

### Login

```javascript
const login = async (email, password) => {
  const response = await fetch('http://tu-api/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};
```

### Añadir al Carrito

```javascript
const addToCart = async (productId, quantity) => {
  const response = await fetch('http://tu-api/cart/add', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return await response.json();
};
```
