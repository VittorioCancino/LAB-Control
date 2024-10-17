# LAB-Control
<p align="justify">
    Official GitHub repository for the access control application implemented in the IT laboratory at Adolfo Ibáñez University. The development of this project uses <a href="https://www.typescriptlang.org/">TypeScript</a> as the main programming language. The frontend is implemented with <a href="https://react.dev/">React</a>, while the backend of the application is built using <a href="https://expressjs.com/">Express.js</a>, all running in the <a href="https://nodejs.org/">Node.js</a> environment. Additionally, the database used for the application is built with <a href="https://www.postgresql.org/">PostgreSQL</a>.
</p>

# Configuration and Deployment
<p align="justify">
    The general configuration of the project is straightforward thanks to the use of <a href="https://www.docker.com/">Docker</a>. The <code>Dockerfile</code> files for both the frontend and backend configure the environments of each container, while Docker Compose uses these files to handle the application deployment.
</p>
Before running the application, <b>you need to configure two <code>.env</code> files:</b>

- A <code>.env</code> file in the <b>server</b> directory, which will be copied inside the container when the Docker build is created.
-   Another <code>.env</code> file in the <b>root directory</b> of the application, which will provide the necessary environment variables for Docker Compose.

<p align="justify">
The <code>.env</code> file in the server directory will contain backend-specific settings like database credentials and API keys. On the other hand, the <code>.env</code> file in the root directory will provide the environment variables that Docker Compose needs to manage the global deployment configuration.
</p>

```
.
├── client
│   ├── Dockerfile
│   ├── index.html
│   └── src
│       ├── App.tsx
│       ├── components
│       │   └── pages
│       ├── index.css
│       └── main.tsx
├── compose.yaml
├── README.md
├── .env        # .env file for Docker Compose
└── server
    ├── Dockerfile
    ├── .env    # .env file for the server
    └── src
        ├── config
        │   └── db.ts
        ├── index.ts
        └── server.ts

```

#### 1. **Server `.env` file** (located in the `server` directory) 
This file contains the full database connection URL.

```Python
# Server .env
DATABASE_URL="postgresql://<your_username>:<your_password>@<your_host>:<your_port>/<your_database_name>"
```

You'll need to replace the placeholders with the actual values:
-   `<your_username>`: Your PostgreSQL username.
-   `<your_password>`: Your PostgreSQL password.
-   `<your_host>`: The host where the database is running (e.g., `localhost`, `database` for Docker).
-   `<your_port>`: The port number for PostgreSQL (default is `5432`).
-   `<your_database_name>`: The name of your database

### 2. **Root `.env` file** (located in the root directory of the project)

This file contains individual database environment variables used by Docker Compose to set up the database container.
```Python
# Root .env (for Docker Compose)
# Set your secret password for the database
DATABASE_PASSWORD=<your_password>

# Set your PostgreSQL username
DATABASE_USER=<your_username>

# Set the name of the database
DATABASE_NAME=<your_database_name>

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
│   └── src
│       ├── App.tsx
│       ├── components
│       │   └── pages
│       │       └── Home.tsx
│       ├── index.css
│       └── main.tsx
├── compose.yaml
├── README.md
├── .env 
└── server
    ├── Dockerfile
    ├── .env
    └── src
        ├── config
        │   └── db.ts    
        ├── index.ts
        └── server.ts
        └── server.ts
```
# Project Structure (Definition)
```
.
├── client                    # Frontend directory
│   ├── Dockerfile            # Docker configuration for the frontend container
│   ├── eslint.config.js      # ESLint configuration for linting and code style rules
│   ├── index.html            # Main HTML file for the frontend application
│   ├── package.json          # Contains dependencies and scripts for the frontend
│   ├── package-lock.json     # Lock file that ensures consistent dependency versions
│   ├── postcss.config.js     # Configuration for PostCSS (used for CSS processing)
│   ├── src                   # Source files for the frontend
│   │   ├── App.tsx           # Main React component file for the frontend
│   │   ├── components        # Directory containing reusable components
│   │   │   └── pages         # Directory for page-level components (full views)
│   │   │       └── Home.tsx  # React component for the homepage
│   │   ├── index.css         # Main CSS file for styling the application
│   │   ├── main.tsx          # Entry point for the React app, renders the app to the DOM
│   │   └── vite-env.d.ts     # TypeScript environment definitions for Vite
│   ├── tailwind.config.js    # Tailwind CSS configuration file
│   ├── tsconfig.json         # TypeScript configuration for the frontend
│   ├── tsconfig.node.json    # TypeScript configuration specific for Node.js
│   └── vite.config.ts        # Vite configuration for frontend build and dev server
├── compose.yaml              # Docker Compose file used for deploying the application build
├── README.md                 # Project documentation and instructions
└── server                    # Backend directory
    ├── Dockerfile            # Docker configuration for the backend container
    ├── package.json          # Contains dependencies and scripts for the backend
    ├── package-lock.json     # Lock file that ensures consistent dependency versions
    ├── src                   # Source files for the backend
    │   ├── config            # Directory for backend configuration files (e.g., database)
    │   │   └── db.ts         # Database configuration for connecting to the DB
    │   ├── index.ts          # Entry point for starting the backend server
    │   └── server.ts         # Main server logic for handling requests
    └── tsconfig.json         # TypeScript configuration for the backend

```

