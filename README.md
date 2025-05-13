# Tutorial_Ludoteca  
# 📚 Proyecto de Gestión de Préstamos - CCSW Tutorial

Este proyecto es el resultado del [Tutorial de CCSW](https://ccsw-csd.github.io/tutorial/), realizado como parte de prácticas formativas de CFGS DAW.  
La aplicación permite gestionar clientes,autores, juegos y préstamos de videojuegos, con funcionalidades de validación, filtros por fecha, cliente o juego, paginación, y más.

---

## 🚀 Tecnologías utilizadas

### Backend (Java + Spring Boot)
- **Java 21**
- **Spring Boot**
  - Spring Web (REST API)
  - Spring Data JPA
  - Spring Validation
- **H2 Database** (base de datos en memoria para pruebas)
- **JUnit 5** (pruebas unitarias e integración)
- **Maven**

### Frontend (Angular)
- **Angular 17**
- **TypeScript**
- **Angular Material / Bootstrap**
- **RxJS**
- **HttpClient (para REST)**

---

## 📂 Estructura del proyecto

### Backend
- `/client`: CRUD de clientes
- `/author`: CRUD de autores
- `/game`: CRUD de juegos
- `/loan`: gestión de préstamos, con validaciónes
- `/common`: incluye clases de paginación (`PageableRequest`), filtros (`SearchCriteria`), y más

### Frontend
- `client.component`: listado, alta, edición y borrado de clientes
- `game.component`: filtrado y gestión de videojuegos
- `author.component`: paginación y gestión de autores
- `loan.component`: paginación, filtrado, alta, baja y visualización de préstamos

---  
[GitDiagram](https://gitdiagram.com/AnaGonBu/Tutorial_Ludoteca)  
![Diagrama](/Screenshots/diagram.png)

## ✅ Funcionalidades clave

- ✔️ Alta, modificación y eliminación de clientes, autores y juegos
- ✔️ Alta de préstamos, con validación (restricción base de datos, un solo registro de préstamo por juego):
  - ❌ No se puede prestar un juego si ya está alquilado en cualquier otro rango de fechas
  - ❌ No se puede prestar un juego si el cliente ya tiene dos préstamos en un ramgo de fechas
- 🔍 Filtros en préstamos por:
  - Cliente
  - Juego
  - Fecha concreta
- 📄 Paginación y ordenación configurable
- 🌐 Comunicación completa vía API REST

  ![Listado de Préstamos](/Screenshots/Loans.png)


---

## ⚠️ Pendiente / Consideraciones

> ❗ **Captura de errores del backend**:  
Actualmente no se recogen de forma adecuada las respuestas HTTP detalladas cuando ocurre una excepción como `IllegalArgumentException`.  
  
🛠️ Esto dificulta mostrar mensajes claros al usuario en el frontend.

---

