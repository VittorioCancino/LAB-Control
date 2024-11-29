# LAB-Control
<p align="justify">
    Official GitHub repository for the access control application implemented in the IT laboratory at Adolfo Ibáñez University. The development of this project uses <a href="https://www.typescriptlang.org/">TypeScript</a> as the main programming language. The frontend is implemented with <a href="https://react.dev/">React</a>, while the backend of the application is built using <a href="https://expressjs.com/">Express.js</a>, all running in the <a href="https://nodejs.org/">Node.js</a> environment. Additionally, the database used for the application is built with <a href="https://www.postgresql.org/">PostgreSQL</a>.
</p>

# Configuration and Deployment
<p align="justify">
    The general configuration of the project is straightforward thanks to the use of <a href="https://www.docker.com/">Docker</a>. The <code>Dockerfile</code> files for both the frontend and backend configure the environments of each container, while Docker Compose uses these files to handle the application deployment.
</p>
Before running the application, <b>you need to configure three <code>.env</code> files:</b>

- Two <code>.env</code> file in the <b>server/config</b> directory, which will be copied inside the container when the Docker build is created.
-   Another <code>.env</code> file in the <b>root directory</b> of the application, which will provide the necessary environment variables for Docker Compose.

<p align="justify">
The <code>.env</code> file in the config directory will contain backend-specific settings like database credentials and API keys. On the other hand, the <code>.env</code> file in the root directory will provide the environment variables that Docker Compose needs to manage the global deployment configuration.In this case, the two <code>.env.environment</code> files define the current environment variables for the Testing and Development environments.
</p>

```
.
├── client
│   ├── Dockerfile
│   ├── index.html
│   ├── public
│   └── src
│       ├── api
│       ├── App.tsx
│       ├── components
│       ├── index.css
│       ├── lib
│       ├── main.tsx
│       ├── types
│       └── vite-env.d.ts
├── compose.yaml
├── .env		# .env file for Docker Compose
├── README.md
└── server
    ├── Dockerfile
    └── src
        ├── config
        │	├──.env.testing			# .env file for Testing Enviroment
        │	└── .env.development	# .env file for Development Enviroment
        ├── controllers
        ├── index.ts
        ├── middleware
        ├── models
        ├── routes
        └── server.ts

```

#### 1. **Config `.env` file** (located in the `config` directory for Testing/Develop) 
This file contains:
- The current Enviroment name  
- The full database connection URL.

```dotenv
# Development Environment Variables
NODE_ENV = environment  # Set this to the current .env.environment name

# Database URL
DATABASE_URL = "postgresql://<your_username>:<your_password>@<your_host>:<your_port>/<environment_database>"

```

You'll need to replace the placeholders with the actual values:
-   `<your_username>`: Your PostgreSQL username.
-   `<your_password>`: Your PostgreSQL password.
-   `<your_host>`: The host where the database is running (e.g., `localhost`, `database` for Docker).
-   `<your_port>`: The port number for PostgreSQL (default is `5432`).
-   `<enviroment_database>`: The name of your database (you should have two databases: one for development and another for testing).
-
Note that these <code>.env</code> files are loaded with the init script located in <code>package.json</code>. This script loads one set of environment variables or another when specified. You have two scripts in this file: a <code>dev</code> script that deploys the development environment and a <code>test</code> script that deploys the testing environment.

You should have two databases, one for development and one for testing. This separation is crucial to ensure that tests run in isolation and do not corrupt the data in the development database if something fails.

### 2. **Root `.env` file** (located in the root directory of the project)

This file contains individual database environment variables used by Docker Compose to set up the database container.
```dotenv
# Root .env (for Docker Compose)
# Set your secret password for the database
DATABASE_PASSWORD=<your_password>

# Set your PostgreSQL username
DATABASE_USER=<your_username>

# Set the name of the database
DATABASE_NAME=<database_name>

# Set the host of the database, default is "database" to link with the Docker Compose network
# In case of using a different value, you should also change the Docker Compose configuration.
DATABASE_HOST=<your_host>
```
### Instructions for replacing placeholders:

-   <code><your_password></code>`: Replace with the password for the PostgreSQL user.
-   <code><your_username></code>: Replace with your PostgreSQL username (e.g., <code>postgres</code>).
-   <code><your_database_name></code>: The name of your PostgreSQL database (e.g., <code>lab-control</code>).
-   <code><your_host></code>: Set to <code>database</code> by default, which links to the Docker Compose service name, but can be changed if necessary. If you change this value, you should also update the Docker Compose configuration accordingly.

<p>
Once both <code>.env</code> files are configured, you can easily deploy the application by running the following command:
</p>

```
docker compose up
```
<p align="justify">
    By executing this command within the directory containing the <code>compose.yaml</code> file, the full application should be deployed. To avoid issues with Docker, we recommend following the <a href="https://docs.docker.com/engine/install/">installation guide</a> available in the official documentation.
</p>

# Project Structure
```
.
├── client
│   ├── Dockerfile
│   ├── index.html
│   ├── public
│   └── src
│       ├── api
│       │   └── AdminApi.ts
│       ├── App.tsx
│       ├── components
│       │   ├── Events
│       │   │   └── Events.tsx
│       │   ├── Header
│       │   │   └── Header.tsx
│       │   ├── Navbar
│       │   │   ├── Navbarmobile.tsx
│       │   │   └── Navbar.tsx
│       │   └── pages
│       │       ├── ActiveUsers.tsx
│       │       ├── CreateAccount.tsx
│       │       ├── Home.tsx
│       │       └── LoginAdmin.tsx
│       ├── index.css
│       ├── lib
│       │   └── AxiosAdmin.ts
│       ├── main.tsx
│       ├── types
│       │   └── index.ts
│       └── vite-env.d.ts
├── compose.yaml
├── README.md
└── server
    ├── Dockerfile
    └── src
        ├── config
        │   └── db.ts
        ├── controllers
        │   ├── Attendance.Controller.ts
        │   ├── Career.Controller.ts
        │   ├── Login.Controller.ts
        │   ├── Role.Controller.ts
        │   └── User.Controller.ts
        ├── index.ts
        ├── middleware
        │   ├── AuthJWT.ts
        │   ├── index.ts
        │   └── RutValidator.ts
        ├── models
        │   ├── Active.model.ts
        │   ├── Admin.model.ts
        │   ├── Career.model.ts
        │   ├── FingerPrint.model.ts
        │   ├── Log.model.ts
        │   ├── Role.model.ts
        │   └── User.model.ts
        ├── routes
        │   ├── router.attendance.ts
        │   ├── router.career.ts
        │   ├── router.role.ts
        │   └── router.user.ts
        └── server.ts


```
# Project Structure (Definition)
```
.
├── client                    # Frontend directory
│   ├── Dockerfile            # Docker configuration for the frontend container
│   ├── index.html            # Main HTML file for the frontend application
│   ├── public                # Directory for publicly accessible static files
│   └── src                   # Source files for the frontend
│       ├── api               # Directory for API-related files
│       │   └── AdminApi.ts   # API file for admin-related functions
│       ├── App.tsx           # Main React component file for the frontend
│       ├── components        # Directory containing reusable components
│       │   ├── Events        # Directory for events-related components
│       │   │   └── Events.tsx # React component for events
│       │   ├── Header        # Directory for header-related components
│       │   │   └── Header.tsx # React component for the header
│       │   ├── Navbar        # Directory for navbar-related components
│       │   │   ├── Navbarmobile.tsx # React component for the mobile navbar
│       │   │   └── Navbar.tsx # React component for the navbar
│       │   └── pages         # Directory for page-level components (full views)
│       │       ├── ActiveUsers.tsx # React component for active users page
│       │       ├── CreateAccount.tsx # React component for account creation page
│       │       ├── Home.tsx    # React component for the homepage
│       │       └── LoginAdmin.tsx # React component for admin login page
│       ├── index.css         # Main CSS file for styling the application
│       ├── lib               # Directory for utility libraries
│       │   └── AxiosAdmin.ts # Axios instance for admin-related API calls
│       ├── main.tsx          # Entry point for the React app, renders the app to the DOM
│       ├── types             # Directory for TypeScript type definitions
│       │   └── index.ts      # TypeScript type definitions
│       └── vite-env.d.ts     # TypeScript environment definitions for Vite
├── compose.yaml              # Docker Compose file used for deploying the application build
├── README.md                 # Project documentation and instructions
└── server                    # Backend directory
    ├── Dockerfile            # Docker configuration for the backend container
    └── src                   # Source files for the backend
        ├── config            # Directory for backend configuration files (e.g., database)
        │   └── db.ts         # Database configuration for connecting to the DB
        ├── controllers       # Directory for backend controllers
        │   ├── Attendance.Controller.ts # Controller for attendance-related logic
        │   ├── Career.Controller.ts     # Controller for career-related logic
        │   ├── Login.Controller.ts      # Controller for login-related logic
        │   ├── Role.Controller.ts       # Controller for role-related logic
        │   └── User.Controller.ts       # Controller for user-related logic
        ├── index.ts          # Entry point for starting the backend server
        ├── middleware        # Directory for middleware
        │   ├── AuthJWT.ts    # Middleware for JWT authentication
        │   ├── index.ts      # Middleware index file
        │   └── RutValidator.ts # Middleware for validating RUTs
        ├── models            # Directory for backend models
        │   ├── Active.model.ts # Model for active entities
        │   ├── Admin.model.ts  # Model for admin entities
        │   ├── Career.model.ts # Model for career entities
        │   ├── FingerPrint.model.ts # Model for fingerprint entities
        │   ├── Log.model.ts     # Model for log entities
        │   ├── Role.model.ts    # Model for role entities
        │   └── User.model.ts    # Model for user entities
        ├── routes            # Directory for backend routes
        │   ├── router.attendance.ts # Router for attendance-related routes
        │   ├── router.career.ts     # Router for career-related routes
        │   ├── router.role.ts       # Router for role-related routes
        │   └── router.user.ts       # Router for user-related routes
        └── server.ts         # Main server logic for handling requests
        
```

