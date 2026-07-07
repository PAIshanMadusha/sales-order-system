<p align="center">
  <img src="https://github.com/user-attachments/assets/efc5c9f6-67b4-48b3-aee6-337d25fb1d2f" width="90" alt="dotnet Logo"/>
</p>

<h1 align="center">📦 Sales Order Management System</h1>
<h4 align="center">BUILT WITH REACT.JS, REDUX, TAILWIND CSS, .NET, AND CLIENT-SERVER ARCHITECTURE</h4>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c4e030de-0d6d-48c2-85f8-a43b9d39c8fe" width="50" alt="React.js"/>&nbsp;
  <img src="https://github.com/user-attachments/assets/7cab4837-d481-4cd9-a92a-2db4b7363678" height="50" alt="Redux.js"/>&nbsp;
  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" height="50" alt="Tailwind CSS"/>&nbsp;
  <img src="https://github.com/user-attachments/assets/6dbe63b9-68cc-4262-9a23-73c4dfc0a010" height="50" alt="C#"/>
</p>

<h4 align="center">DATABASE: SQL SERVER MANAGEMENT STUDIO</h4>
<p align="center">
  <img src="https://github.com/user-attachments/assets/fd749235-0d68-46b1-a518-5bf821ad3313" width="50" height="50" alt="SQL Server Management Studio" />
</p>

---

A full-stack **Sales Order Management System** consisting of a **.NET 8 Web API backend** built with **C#** following **Clean Architecture principles**, and a modern frontend developed using **React**, **Redux Toolkit**, and **Tailwind CSS**. The application demonstrates a real-world layered architecture with complete **CRUD operations** for sales order management, separation of business logic, centralized state management, and a responsive user-friendly interface.

## 🚀 Features

### 🧾 Sales Order Management

* Create new sales orders
* Update and delete existing sales orders
* View all sales orders in a structured and responsive table
* View complete customer, item, and sales order details
* Manage multiple items within a single sales order

### 👤 Customer Management

* Customer dropdown populated dynamically from the database
* Automatically populate customer address details when a customer is selected
* Allow users to modify address fields before saving the order

### 📦 Item Management

* Item Code and Item Description dropdowns populated from the database
* Automatically retrieve and display item prices from the backend

### 🧮 Real-Time Calculations

* Automatically calculate **Excl Amount** = Quantity × Price
* Automatically calculate **Tax Amount** = Excl Amount × Tax Rate ÷ 100
* Automatically calculate **Incl Amount** = Excl Amount + Tax Amount
* Calculate order subtotal, tax total, and grand total in real time

### 🖨️ Order Features

* Home page displaying all sales orders in a responsive table
* Create new sales orders and edit existing orders
* Reset form functionality to quickly clear all entered data
* Structured order data design that can be extended with printing/report generation features

---

## 🛠️ Tech Stack
The following technologies and tools are used throughout the project:

| Layer                    | Technology                          | Description                                                                        |
| :----------------------- | :---------------------------------- | :--------------------------------------------------------------------------------- |
| **Backend Framework**    | .NET 8 Web API                      | RESTful API development using ASP.NET Core.                                        |
| **Programming Language** | C#                                  | Primary language used for backend development.                                     |
| **Architecture**         | Clean Architecture (Layered Architecture) | Separates API, Application, Domain, and Infrastructure layers for maintainability. |
| **ORM**                  | Entity Framework Core 8.0           | Object-Relational Mapper (ORM) for database operations.                            |
| **Database**             | SQL Server                          | Relational database used to store application data.                                |
| **Database Provider**    | EF Core SQL Server Provider         | Enables Entity Framework Core to communicate with SQL Server.                      |
| **Database Migrations**  | EF Core Migrations                  | Manages database schema creation and updates.                                      |
| **Dependency Injection** | ASP.NET Core Dependency Injection   | Built-in dependency injection for services and repositories.                       |
| **API Documentation**    | Swagger (Swashbuckle)               | Interactive API documentation and testing interface.                               |
| **Object Mapping**       | AutoMapper                          | Simplifies mapping between entities and DTOs.                                      |
| **Frontend Framework**   | React 19                            | Component-based frontend library for building the user interface.                  |
| **State Management**     | Redux Toolkit                       | Centralized state management for orders and application data.                      |
| **Routing**              | React Router                        | Client-side routing between application pages.                                     |
| **HTTP Client**          | Axios                               | Handles communication between the frontend and backend APIs.                       |
| **Styling**              | Tailwind CSS v4                     | Utility-first CSS framework for responsive UI development.                         |
| **Build Tool**           | Vite                                | Fast frontend development server and build tool.                                   |
| **Package Manager**      | npm                                 | Manages frontend dependencies and project scripts.                                 |
| **Version Control**      | Git & GitHub                        | Source code management and version control.                                        |

---

## 🏗️ Architecture Overview
The backend follows **Clean Architecture (Layered Architecture)**, while the frontend follows a **component-based architecture** using React, Redux, and reusable UI components. The project is organized into separate backend and frontend applications as shown below:

```text
sales-order-system/
│
├── backend/                          # .NET 8 Web API
│   │
│   ├── SalesOrder.API/               # API layer (Controllers & application entry point)
│   │   ├── Controllers/
│   │   └── Properties/
│   │
│   ├── SalesOrder.Application/       # Business logic, DTOs & service interfaces
│   │   ├── Interfaces/
│   │   ├── Models/
│   │   └── Services/
│   │
│   ├── SalesOrder.Domain/            # Domain entities
│   │   └── Entities/
│   │
│   ├── SalesOrder.Infrastructure/    # Database, repositories & external services
│   │   ├── Data/
│   │   │   └── SeedData/
│   │   ├── Migrations/
│   │   └── Repositories/
│   │
│   ├── SalesOrder.sln                # Solution file
│   └── .gitignore
│
├── frontend/                         # React + Redux + Tailwind CSS
│   │
│   ├── public/                       # Static assets
│   │
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── common/
│   │   │   └── sales-order/
│   │   │
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── pages/                    # Application pages
│   │   ├── redux/                    # Redux store & slices
│   │   │   └── slices/
│   │   ├── services/                 # API service layer
│   │   ├── utils/                    # Helper functions & calculations
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── LICENSE
└── README.md
```

#### 📁 Backend Layers

- **SalesOrder.API**: Exposes REST API endpoints and handles HTTP requests.
- **SalesOrder.Application**: Contains business logic, DTOs, interfaces, and services.
- **SalesOrder.Domain**: Defines the core domain entities and business models.
- **SalesOrder.Infrastructure**: Handles database access, Entity Framework Core, repositories, migrations, and seed data.

#### 📁 Frontend Structure

- **components**: Reusable UI components shared across the application.
- **pages**: Main application screens (Home & Sales Order).
- **redux**: Centralized state management using Redux Toolkit.
- **services**: API communication using Axios.
- **hooks**: Custom React hooks.
- **utils**: Utility functions such as order calculations.

---

## ⚙️ Setup & Installation
Follow the steps below to set up and run the project successfully:

#### ⚙️ Backend Setup

#### 1. ✅ Clone the Repository
Clone the repository and navigate to the backend directory:

```bash
git clone https://github.com/PAIshanMadusha/sales-order-system.git
cd sales-order-system/backend
```

#### 2. ✅ Restore NuGet Packages
Download all required NuGet packages defined in the project files:

```bash
dotnet restore
```

#### 3. ✅ Configure the Database
Update the `appsettings.json` connection string according to your SQL Server instance:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=SalesOrderDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

#### 4. ✅ Apply Database Migrations
Create and update the database using Entity Framework Core migrations:

```bash
dotnet ef database update --project SalesOrder.Infrastructure --startup-project SalesOrder.API
```

#### 5. ✅ Run the Backend API
Start the backend server using the following command:

```bash
dotnet run --project SalesOrder.API
```

#### 6. ⚡ Access the Backend API
After the application starts successfully, the API and Swagger documentation will be available at:

```text
http://localhost:5030
```

```text
http://localhost:5030/swagger
```

#### 🌐 Frontend Setup

#### 1. ✅ Install Dependencies
Navigate to the frontend directory and install the required dependencies:

```bash
cd frontend
npm install
```

#### 2. ✅ Configure Environment Variables (Optional)
Create a `.env` file in the frontend root directory if required:

```env
VITE_API_URL=http://localhost:5030/api
```

#### 3. ⚡ Start the Development Server
Run the following command to start the frontend application, the application will be available at:

```bash
npm run dev
```

```text
http://localhost:5173
```

---

## 🔌 API Endpoints
The following REST API endpoints are available for managing clients, items, and sales orders:

#### 📦 Customer & Item Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/client` | Retrieve all clients |
| GET | `/api/client/{id}` | Retrieve a client by ID |
| GET | `/api/item` | Retrieve all items |
| GET | `/api/item/{id}` | Retrieve an item by ID |

#### 🧾 Sales Order Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/salesorder` | Retrieve all sales orders |
| GET | `/api/salesorder/{id}` | Retrieve a sales order by ID |
| POST | `/api/salesorder` | Create a new sales order |
| PUT | `/api/salesorder/{id}` | Update an existing sales order |
| DELETE | `/api/salesorder/{id}` | Delete a sales order by ID |

## 📸 System Screenshots
These screenshots illustrate how the system appears on desktop:

---
<p align="center">
  <img src="https://github.com/user-attachments/assets/08e08289-7e18-40aa-acea-da3f5c91bfff" alt="Screenshot 1" width="800">
  <img src="https://github.com/user-attachments/assets/b45e718e-b6ad-42d5-8995-6c93990db562" alt="Screenshot 2" width="800">
  <img src="https://github.com/user-attachments/assets/02e83b0a-0718-4106-b261-99e6653e1599" alt="Screenshot 3" width="800">
</p>

---

### 👨‍💻 Created by: 
**Ishan Madhusha**  
GitHub: [PAIshanMadusha](https://github.com/PAIshanMadusha)

Feel free to explore my work and get in touch if you'd like to collaborate! 🚀

---

## 📝 License:  
This project is licensed under the MIT License : See the [LICENSE](LICENSE) file for details.
