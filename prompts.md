# Prompts utilizados para desarrollar este proyecto

1. "Implementa un Data Privacy Vault para anonimizar PII usando Node.js"
   - Estoy creando un Data Privacy Vault para que la información de identificación personal (PII) se anonimice utilizando Node.js.
   - Necesito comenzar con el primer paso: tener un endpoint que reciba una cadena con un mensaje que contenga PII como nombres, correos electrónicos y números de teléfono, y lo devuelva anonimizado reemplazando el nombre completo, correo electrónico y teléfono con un token alfanumérico.
   - Ejemplo de solicitud:
     ```sh
     curl -X POST http://localhost:3001/anonymize -H "Content-Type: application/json" -d '{"message":"oferta de trabajo para Nico Pico con email nicolas@gmail.com y teléfono 1234567891"}'
     ```
   - Respuesta esperada:
     ```json
     {
         "anonymizedMessage": "oferta de trabajo para d7e8e0bf bd673df2 con email b09bde30 y teléfono dd195b6c"
     }
     ```

2. "Crea un endpoint para anonimizar mensajes con nombres, emails y teléfonos"
   - Implementar un endpoint que reciba un mensaje con PII y lo anonimice.
   - Utilizar expresiones regulares para identificar y reemplazar nombres, correos electrónicos y números de teléfono con tokens alfanuméricos.

3. "Implementa un endpoint para desanonimizar mensajes"
   - Implementar un endpoint que reciba un mensaje anonimizado y lo desanonimice.
   - Ejemplo de solicitud:
     ```sh
     curl -X POST http://localhost:3001/deanonymize -H "Content-Type: application/json" -d '{"anonymizedMessage":"oferta de trabajo para NAME_e1be92e2b3a5 con email EMAIL_8004719c6ea5 y teléfono PHONE_40e83067b9cb"}'
     ```
   - Respuesta esperada:
     ```json
     {
         "message": "oferta de trabajo para Nicolas pico con email nicolas@gmail.com y teléfono 1234567891"
     }
     ```

4. "Añade persistencia en MongoDB Atlas para almacenar las parejas [información privada, token]"
   - Utilizar MongoDB Atlas para almacenar las parejas de información privada y sus tokens correspondientes.
   - Asegurarse de que la información se almacene de manera segura y eficiente.

5. "Crea una clase para conectarse con OpenAI y hacer text completion"
   - Implementar una clase en Node.js que se conecte con la API de OpenAI para realizar completaciones de texto.
   - Asegurarse de manejar adecuadamente las respuestas de la API y los posibles errores.

6. "Implementa un nuevo endpoint llamado secureChatGPT que anonimice el prompt, lo envíe a ChatGPT y desanonimice la respuesta"
   - Crear un endpoint que reciba un prompt, lo anonimice, lo envíe a ChatGPT y luego desanonimice la respuesta antes de devolverla al cliente.

7. "Genera un archivo README.md con la descripción del proyecto y los pasos para instalarlo"
   - Crear un archivo README.md que describa el proyecto, sus funcionalidades y los pasos necesarios para instalar y ejecutar el proyecto, adicionalmente añádele emojis para que se vea más divertido.