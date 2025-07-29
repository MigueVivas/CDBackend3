*** Resultado test "adoptions.controller.test.js" ***
Adoptions Controller - Unit

Este conjunto de tests unitarios se enfoca en verificar la funcionalidad individual de los métodos dentro del controlador de adopciones, asegurando que cada operación se comporte como se espera bajo diversas condiciones.

Resumen de Ejecución:

    Total de Pruebas Ejecutadas: 7

    Pruebas Pasadas: 7

    Pruebas Fallidas: 0

    Tiempo Total: 26 ms

Detalle de las Pruebas:

- getAllAdoptions: devuelve lista de adopciones. Estado: PASSED.
Notas: Verifica que el método retorna correctamente una lista de adopciones.
- getAdoption retorna una adopción por ID. Estado: PASSED.
Notas: Confirma que se puede recuperar una adopción específica usando su ID.
- getAdoption responde 404 si no se encuentra. Estado: PASSED.
Notas: Asegura que se maneja correctamente el caso de una adopción no existente.
- createAdoption crea una adopción exitosamente. Estado: PASSED.
Notas:Valida el proceso de creación exitosa de una nueva adopción.
- createAdoption responde 404 si no existe el usuario. Estado: PASSED.
Notas: Comprueba que no se permite crear una adopción con un usuario inexistente.
- createAdoption responde 404 si no existe la mascota. Estado: PASSED.
Notas: Comprueba que no se permite crear una adopción con una mascota inexistente.
- createAdoption responde 400 si la mascota ya está adoptada. Estado: PASSED.
Notas: Asegura que se previene la adopción de una mascota que ya está asignada.

Conclusión:

Todos los tests unitarios para el controlador de adopciones han pasado exitosamente, lo que indica que la lógica implementada para cada uno de los métodos probados funciona según lo esperado y maneja correctamente los diferentes escenarios (éxito, datos no encontrados, datos inválidos). Esto proporciona una buena base de confianza en la estabilidad y corrección de las funcionalidades del controlador.


*** Resultado 1- test "adoptions.router.test.js" ***

Este conjunto de tests de integración verifica la interacción de las rutas del router de adopciones con la aplicación real, incluyendo la base de datos (si aplica).

Resumen de Ejecución:

    Total de Pruebas Ejecutadas: 2 (ganchos before all y after all que fallaron)

    Pruebas Pasadas: 0

    Pruebas Fallidas: 2

    Tiempo Total: 4 ms

Advertencias y Errores Detectados:

Advertencia de Deprecación de Mongoose:

    (node:20464) [MONGOOSE] DeprecationWarning: Mongoose: the strictQuery option will be switched back to false by default in Mongoose 7. Use mongoose.set('strictQuery', false); if you want to prepare for this change. Or use mongoose.set('strictQuery', true); to suppress this warning.

        Notas: Esta es una advertencia de Mongoose que indica un cambio próximo en el comportamiento de la opción strictQuery en la versión 7. No es un error crítico que detenga la ejecución, pero es recomendable abordarlo para evitar posibles problemas en el futuro. Se sugiere agregar mongoose.set('strictQuery', false); o mongoose.set('strictQuery', true); en la configuración inicial de Mongoose para suprimirla.

Errores en la Ejecución de Tests:
- Descripción del Error: "before all" hook for "GET /api/adoptions devuelve lista de adopciones".
  Tipo de Error: chai.request is not a function
  Ubicación del Error: file:///C:/Users/saviv/.../src/test/adoptions.router.test.js:13:22
  Notas: Este error indica que la función chai.request no está disponible cuando se intenta usar en el gancho before all. Sugiere un problema en la inicialización o integración de chai-http con chai en el entorno de ES Modules. Es el mismo error recurrente en intentos anteriores.

- Descripción del Error: "after all" hook for "POST /api/adoptions/:uid/:pid crea una nueva adopción".
Tipo de Error: Cannot read properties of undefined (reading 'close').
Ubicación del Error: file:///C:/Users/saviv/.../src/test/adoptions.router.test.js:17:15
Notas: Este error ocurre en el gancho after all y sugiere que se está intentando llamar al método close() sobre un objeto que es undefined. Esto es común si la conexión a la base de datos o el servidor de la aplicación (que debería cerrarse al final de los tests) no se inicializó correctamente o la variable que lo referencia no está definida en el ámbito esperado.

*** Resultado 2- test "adoptions.router.test.js" ***

Este conjunto de tests de integración verifica la interacción de las rutas del router de adopciones con la aplicación real y la base de datos.

Resumen de Ejecución:

    Total de Pruebas Esperadas: Aproximadamente 5 (1 pasada, 1 pendiente, 2 fallidas, 1 implícitamente pasada por el console.log del test)

    Pruebas Pasadas: 3

    Pruebas Fallidas: 2

    Pruebas Pendientes: 1

    Tiempo Total: 10s

    Conexión a MongoDB: Éxito.

    Conexión a MongoDB para testing: Éxito.

    Conexión a MongoDB cerrada: Éxito al finalizar.

Detalle de las Pruebas y Errores:

- GET /api/adoptions devuelve lista de adopciones.
  Estado: PASSED.
  Notas: La prueba inicial para obtener todas las adopciones pasó exitosamente.
    Logs:
    Ejecutando: GET /api/adoptions <br> Status recibido: 200 <br> Body recibido: { "status": "success", "payload": [] } <br> Test GET /api/adoptions completado
- POST /api/adoptions/:uid/:pid crea una nueva adopción.
  Estado: PASSED
  Notas: La prueba de creación de adopción pasó, aunque la creación real resultó en un 404. Esto significa que la aserción de la prueba probablemente esperaba un 404 en este escenario, o la prueba está configurada para pasar si la respuesta coincide con lo esperado, incluso si es un error. <br> Logs:
    Ejecutando: POST /api/adoptions con IDs: { userId: '6886d998c6271379e881087a', petId: '6886d998c6271379e881087b' } <br> Status recibido: 404 <br> Body recibido: { "status": "error", "error": "user Not found" } <br> Test POST /api/adoptions completado
- GET /api/adoptions/:aid con ID válido
  Estado: PENDING
  Notas: Error: Pending { message: 'sync skip; aborting execution' } <br> Esta prueba se marcó como "pendiente" o "saltada". El log "No se pudo crear adopción, saltando test específico" indica que la condición previa para esta prueba (probablemente la creación exitosa de una adopción) no se cumplió. Es probable que, al recibir un 404 para la creación inicial, el test subsecuente que depende de esa adopción creada se haya omitido intencionalmente. Esto es un buen manejo de dependencias en tus tests.
- GET /api/adoptions/:aid con ID inválido devuelve error.
  Estado: FAILED
  Notas: Error: Timeout of 5000ms exceeded. <br> La prueba superó el tiempo límite de 5 segundos. <br> Log: Ejecutando: GET /api/adoptions/invalid-id <br> Esto sugiere que tu API no está respondiendo con un error (ej. 400 Bad Request) o una respuesta de 404 dentro del tiempo esperado cuando se le proporciona un ID con formato incorrecto, o el test no está manejando correctamente la finalización (llamando a done() o resolviendo una promesa).
- GET /api/adoptions/:aid con ID que no existe.
  Estado: PASSED
  Notas: La prueba para IDs que no existen pasó exitosamente.
    Logs:
    Ejecutando: GET /api/adoptions/6886d99dc6271379e8810881 <br> Status recibido: 404 <br> Body recibido: { "status": "error", "error": "Adoption not found" } <br> Test ID inexistente completado <br> Este es el comportamiento esperado: la API devuelve 404 si el ID tiene el formato correcto pero el recurso no existe.
- POST /api/adoptions/:uid/:pid con IDs inválidos.
  Estado: FAILED
  Notas: Error: Timeout of 5000ms exceeded. <br> Similar al timeout anterior, esta prueba para crear una adopción con IDs de usuario/mascota inválidos se colgó. <br> Log: Ejecutando: POST con IDs inválidos <br> Indica que la API no está manejando rápidamente las solicitudes de creación con datos inválidos, lo que puede causar que el test se quede esperando y exceda el tiempo límite. Deberías esperar una respuesta rápida (ej. 400 Bad Request) para estos escenarios.

Advertencias y Deprecaciones:

    Advertencia de Deprecación de Mongoose:

        Mongoose: the \strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.`

        Notas: Esta es una advertencia de Mongoose que indica un cambio próximo en el comportamiento de la opción strictQuery. Es una buena práctica agregar mongoose.set('strictQuery', false); o mongoose.set('strictQuery', true); en tu configuración de conexión a Mongoose para suprimirla y prepararte para futuras versiones.

*** Resultado 3- test "adoptions.router.test.js" y "adoptions.controller.test.js" ***

Adoptions Router - Integración

Conexión a la Base de Datos
    Conectado a MongoDB
    Conectado a MongoDB para testing
    Conexión a MongoDB cerrada

Pruebas de Endpoints

- GET /api/adoptions
    Descripción: Recupera una lista de todas las adopciones.
    Ejecución: GET /api/adoptions
    Status Recibido: 200
    Body Recibido:
      {
      "status": "success",
      "payload": []
      }
    Resultado: ✔ GET /api/adoptions devuelve lista de adopciones (50ms)
    Estado: PASSED

- POST /api/adoptions/:uid/:pid
    Descripción: Crea una nueva adopción.
        * Caso 1: Usuario no encontrado
            Ejecución: POST /api/adoptions con IDs:
              {
                "userId": "688823ef7900c0750e1c4c18",
                "petId": "688823ef7900c0750e1c4c19"
              }
            Status Recibido: 404
            Body Recibido:
            {
              "status": "error",
              "error": "user Not found"
            }
            Resultado: ✔ POST /api/adoptions/:uid/:pid crea una nueva adopción
            Estado: PASSED (aunque el resultado fue un error esperado)
        * Caso 2: IDs inválidos
            Ejecución: POST con IDs inválidos
            Status Recibido: 400
            Body Recibido:
              {
                "status": "error",
                "error": "Invalid u ID format"
              }
            Resultado: ✔ POST /api/adoptions/:uid/:pid con IDs inválidos
            Estado: PASSED

- GET /api/adoptions/:aid
    Descripción: Recupera una adopción por su ID.
        * Caso 1: ID válido (SKIP)
            Ejecución: Creando adopción para test...
            Resultado Creación: 404 { status: 'error', error: 'user Not found' }
            Mensaje: No se pudo crear adopción, saltando test específico
            Error: Pending { message: 'sync skip; aborting execution' }
            Resultado: GET /api/adoptions/:aid con ID válido
            Estado: PENDING (salteado debido a error de prerrequisito)

        * Caso 2: ID inválido
            Ejecución: GET /api/adoptions/invalid-id
            Status Recibido: 400
            Body Recibido:
              {
                "status": "error",
                "error": "Invalid a ID format"
              }
            Resultado: ✔ GET /api/adoptions/:aid con ID inválido devuelve error
            Estado: PASSED
        
        * Caso 3: ID inexistente
            Ejecución: GET /api/adoptions/688823ef7900c0750e1c4c1e
            Status Recibido: 404
            Body Recibido:
              {
                "status": "error",
                "error": "Adoption not found"
              }
            Resultado: ✔ GET /api/adoptions/:aid con ID que no existe
            Estado: PASSED

Adoptions Controller - Unitario

Pruebas de Métodos
    ✔ getAllAdoptions devuelve lista de adopciones
    ✔ getAdoption retorna una adopción por ID
    ✔ getAdoption responde 404 si no se encuentra
    ✔ createAdoption crea una adopción exitosamente
    ✔ createAdoption responde 404 si no existe el usuario
    ✔ createAdoption responde 404 si no existe la mascota
    ✔ createAdoption responde 400 si la mascota ya está adoptada

Resumen General
    12 pruebas pasadas
    1 prueba pendiente
    Tiempo Total: 172ms