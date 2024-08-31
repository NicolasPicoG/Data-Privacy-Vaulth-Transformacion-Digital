## Grupo N1

### Los Generaores de IA

# Data Privacy Vault con Integración de ChatGPT

Este proyecto implementa un Data Privacy Vault que anonimiza información personal identificable (PII) en mensajes de texto y proporciona una integración segura con ChatGPT.

## Características

- Anonimización de nombres, correos electrónicos y números de teléfono en mensajes de texto.
- Desanonimización de mensajes previamente anonimizados.
- Integración segura con ChatGPT para procesar prompts que contienen información sensible.
- Persistencia de tokens en MongoDB Atlas.

## Requisitos previos

- Node.js (versión 12 o superior)
- Cuenta en MongoDB Atlas
- Cuenta en OpenAI y API key

## Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/NicolasPicoG/transformaciondigital.git
   cd transformaciondigital
   ```


2. Instalar las dependencias:
   ```
   npm install
   ```


3. Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   MONGODB_URI=<tu_cadena_de_conexion_mongodb>
   OPENAI_API_KEY=<tu_api_key_de_openai>
   ```


4. Iniciar el servidor:
   ```
   node server.js
   ```


## Uso

### Anonimizar un mensaje

bash
curl -X POST http://localhost:3001/anonymize -H "Content-Type: application/json" -d '{"message":"oferta de trabajo para Juan Pérez con email jperez@example.com y teléfono 1234567890"}'

### Desanonimizar un mensaje

bash
curl -X POST http://localhost:3001/deanonymize -H "Content-Type: application/json" -d '{"anonymizedMessage":"oferta de trabajo para NAME_abc123 con email EMAIL_def456 y teléfono PHONE_ghi789"}'


### Usar ChatGPT de forma segura


bash
curl -X POST http://localhost:3001/secureChatGPT -H "Content-Type: application/json" -d '{"prompt":"Genera un correo para Juan Pérez (jperez@example.com) sobre su oferta de trabajo"}'

## Notas de seguridad

- Asegúrese de mantener su archivo `.env` seguro y no lo comparta públicamente.
- Este proyecto es una demostración y puede requerir medidas de seguridad adicionales para su uso en producción.
