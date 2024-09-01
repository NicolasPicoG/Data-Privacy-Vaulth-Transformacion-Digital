# Grupo N1  - Los Generadores de IA 🤖

Este proyecto implementa un Data Privacy Vault que anonimiza información personal identificable (PII) en mensajes de texto y proporciona una integración segura con ChatGPT.

## Características ✨

- Anonimización de nombres, correos electrónicos y números de teléfono en mensajes de texto.
- Desanonimización de mensajes previamente anonimizados.
- Integración segura con ChatGPT para procesar prompts que contienen información sensible.
- Persistencia de tokens en MongoDB Atlas.

## Requisitos previos 📋

- Node.js (versión 12 o superior)
- Cuenta en MongoDB Atlas
- Cuenta en OpenAI y API key

## Instalación 📦

1. Clonar el repositorio:
   ```
   git clone git@github.com:NicolasPicoG/Data-Privacy-Vaulth-Transformacion-Digital.git
   cd Data-Privacy-Vaulth-Transformacion-Digital
   ```

2. Instalar las dependencias y otros complementos: 📦
   ```bash
   npm install
   npm install mongodb
   ```

3. Busca el archivo `.env` en la raíz del proyecto y reemplázalo con valores reales:
   ```
   MONGODB_URI=<tu_cadena_de_conexion_mongodb>
   OPENAI_API_KEY=<tu_api_key_de_openai>
   ```

4. Iniciar el servidor:
   ```
   node server.js
   ```

## Uso 🚀

### Anonimizar un mensaje

```bash
curl -X POST http://localhost:3001/anonymize -H "Content-Type: application/json" -d '{"message":"oferta de trabajo para Nico Pico con email nicopg@example.com y teléfono 1234567890"}'
```

### Desanonimizar un mensaje

```bash
curl -X POST http://localhost:3001/deanonymize -H "Content-Type: application/json" -d '{"anonymizedMessage":"oferta de trabajo para NAME_abc123 con email EMAIL_def456 y teléfono PHONE_ghi789"}'
```

### Uso con ChatGPT

```bash
curl -X POST http://localhost:3001/secureChatGPT -H "Content-Type: application/json" -d '{"prompt":"Genera un correo para Nico Pico (nicopg@example.com) sobre su oferta de trabajo"}'
```

## Notas de seguridad 🔒

- Asegúrese de mantener su archivo `.env` seguro y no lo comparta públicamente.
- Por favor remplace los archivos del `.env` con valores reales para hacer la prueba del sistema.
- Este proyecto es una demostración y puede requerir medidas de seguridad adicionales para su uso en producción.
