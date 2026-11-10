# Fix-IT InnovaTech

## Descripción

Fix-IT InnovaTech es una aplicación móvil orientada a la gestión de incidencias tecnológicas dentro de Innova Tech Solutions S.A. Actualmente, los reportes se gestionan de forma informal a través de llamadas, correos y WhatsApp, lo que genera pérdida de información y poca trazabilidad. La aplicación centraliza el registro, seguimiento y consulta de incidentes para mejorar la organización del soporte técnico.

## Objetivo

Desarrollar un primer avance funcional del frontend móvil con React Native y Expo, preparado para integrarse posteriormente con una API REST en Spring Boot y una base de datos PostgreSQL. El objetivo actual es validar la experiencia de usuario, la navegación, los formularios y la lógica mock del flujo completo de incidencias.

## Tecnologías

- React Native
- TypeScript
- Expo
- React Navigation / Expo Router
- Fetch
- AsyncStorage
- React Native Safe Area Context

## Funcionalidades actuales

- Login mock con validación
- Dashboard con resumen de incidencias
- Registro de incidencias
- Consulta de incidencias
- Detalle de incidencia con timeline
- Seguimiento de estado
- Perfil del usuario
- Consumo de API externa meteorológica
- Validaciones de formularios
- Datos mock y persistencia local de sesión

## Arquitectura

La arquitectura actual está preparada para una evolución futura:

React Native → API REST Spring Boot → PostgreSQL

En esta primera etapa el frontend trabaja con datos mock y funcionalidades locales para validar la interfaz y la experiencia del usuario.

## Instalación

1. Clona el proyecto.
2. Instala dependencias:

```bash
npm install
```

3. Inicia la aplicación:

```bash
npx expo start
```

4. Desde la terminal, selecciona la opción de emulador o escanea el código QR con Expo Go.

## Credenciales de prueba

- Correo: soporte@innovatech.com
- Contraseña: 123456

## API externa

La aplicación consume la API pública Open-Meteo para mostrar las condiciones climáticas de la sede en Lima dentro del dashboard. Esta integración está separada en un servicio dedicado para facilitar su reemplazo por otra fuente de datos en una etapa posterior.

## Próxima etapa

La siguiente fase del proyecto incluirá:

- Spring Boot
- PostgreSQL
- API REST real
- JWT o autenticación segura
- Persistencia de incidencias
- Gestión real de usuarios y soporte técnico

## Flujo esperado

1. Abrir app.
2. Iniciar sesión con credenciales mock.
3. Ver dashboard.
4. Revisar incidencias recientes.
5. Filtrar incidencias.
6. Ver detalle de incidencia.
7. Reportar un caso nuevo.
8. Revisar perfil.
9. Cerrar sesión.
