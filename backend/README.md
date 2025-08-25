Usar este archivo para explicar el la parte de la base de datos
NOTA: EL ARCHIVO .env solo se subirá 1 vez. ASEGURAR QUE LUEGO SEA AGREGADO AL GITIGNORE

Esta estructura de carpetas utiliza prácticas comunes en proyectos medianos/grandes. Estas son: 
  -Separación de responsabilidades
  -Arquitectura en capas
  -Dont Repeat Yourself
  -Seguridad y validación
  -Escalabilidad
  -Configuración centralizada (Carpeta config)
  -Testing

1. 📁 /controllers
   - Responsabilidad: Manejar la lógica de las rutas HTTP (req/res).
   - Contenido típico:
     * Funciones que procesan peticiones (GET, POST, etc.).
     * Llama a servicios pero NO contiene lógica de negocio.
   - Ejemplo: userController.js, productController.js

2. 📁 /services
   - Responsabilidad: Contener la lógica de negocio principal.
   - Contenido típico:
     * Funciones complejas (cálculos, procesamiento de datos).
     * Interacción con modelos/base de datos.
   - Ejemplo: userService.js (con métodos como createUser, updateUser)

3. 📁 /models o carpeta /prisma
   - Responsabilidad: Definir la estructura de datos y conexión con BD.
   - Contenido típico:
     * Schemas (Mongoose) o modelos (Sequelize).
     * Definiciones de tablas/colecciones.
   - Ejemplo: User.js (con campos: name, email, password)

4. 📁 /routes
   - Responsabilidad: Definir los endpoints de la API.
   - Contenido típico:
     * Mapeo URL → Controlador.
     * Uso de middlewares específicos.
   - Ejemplo: userRoutes.js (con rutas como /users, /users/:id)

5. 📁 /middlewares
   - Responsabilidad: Procesamiento intermedio de peticiones.
   - Contenido típico:
     * Autenticación (JWT).
     * Validaciones preliminares.
     * Logging.
   - Ejemplo: authMiddleware.js, loggerMiddleware.js

6. 📁 /validations
   - Responsabilidad: Validar datos de entrada.
   - Contenido típico:
     * Esquemas (usando Joi, Zod, etc.).
     * Reglas para request bodies/params.
   - Ejemplo: userValidations.js (valida email, password)

7. 📁 /helpers
   - Responsabilidad: Funciones utilitarias reutilizables.
   - Contenido típico:
     * Formateo de respuestas API.
     * Funciones de apoyo (hasheo, generación de tokens).
     * Funciones de errores.
   - Ejemplo: apiResponse.js, cryptoHelper.js

8. 📁 /config o carpeta /prisma
   - Responsabilidad: Configuración global de la aplicación.
   - Contenido típico:
     * Variables de entorno (DB conexión, API keys).
     * Constantes reutilizables.
   - Ejemplo: database.js, envConfig.js

9. 📁 /tests (opcional pero recomendado)
   - Responsabilidad: Pruebas automatizadas.
   - Contenido típico:
     * Pruebas unitarias (services/helpers).
     * Pruebas de integración (rutas).
   - Ejemplo: userService.test.js, authMiddleware.test.js