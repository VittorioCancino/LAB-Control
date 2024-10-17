# LAB-Control
<p align="justify">
    Official GitHub repository for the access control application implemented in the IT laboratory at Adolfo Ibáñez University. The development of this project uses <a href="https://www.typescriptlang.org/">TypeScript</a> as the main programming language. The frontend is implemented with <a href="https://react.dev/">React</a>, while the backend of the application is built using <a href="https://expressjs.com/">Express.js</a>, all running in the <a href="https://nodejs.org/">Node.js</a> environment. Additionally, the database used for the application is built with <a href="https://www.postgresql.org/">PostgreSQL</a>.
</p>

# Configuration and Deployment
<p align="justify">
    The general configuration of the project is straightforward thanks to the use of <a href="https://www.docker.com/">Docker</a>. The <code>Dockerfile</code> files for both the frontend and backend configure the environments of each container, while Docker Compose calls these files to generate the application deployment. This deployment can be easily achieved by running the following command:
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
│   ├── src
│   │   ├── App.tsx
│   │   ├── components
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   └── vite.config.ts
├── compose.yaml -> Main docker compose for 
├── README.md
└── server
    ├── Dockerfile
    └── src
        ├── config
        ├── index.ts
        └── server.ts
```
# Project Structure (Definition)
```
.
├── client
│   ├── Dockerfile -> Dockerfile containing build configuration for the frontend (React app)
│   ├── index.html -> Entry point of the frontend, includes the basic HTML structure
│   ├── src
│   │   ├── App.tsx -> Main component for the frontend application (React)
│   │   ├── components -> Folder containing individual UI components for the app
│   │   ├── index.css -> Global CSS styles for the frontend
│   │   ├── main.tsx -> Main entry point to bootstrap the React app in the browser
│   │   └── vite-env.d.ts -> TypeScript declaration for Vite environment variables
│   └── vite.config.ts -> Configuration file for Vite (the frontend build tool)
├── compose.yaml -> Docker Compose file for defining and running multi-container Docker applications
├── README.md -> Documentation file with instructions and details about the project
└── server
    ├── Dockerfile -> Dockerfile containing build configuration for the backend (server)
    └── src
        ├── config -> Folder containing configuration files (e.g., environment settings, database config)
        ├── index.ts -> Main entry point for the backend server application
        └── server.ts -> Server setup and routing logic for handling API requests
```

