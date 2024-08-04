# lotof.template.service

## Description
🚀 This project is a microservice built using the NestJS framework. It serves as a central point for handling requests and routing them to appropriate microservices. The microservice also integrates with RabbitMQ for message brokering.

🔌 With its modular architecture, the microservice enables seamless communication between different services, ensuring efficient and scalable application development.

🔒 By leveraging the power of NestJS, developers can easily implement authentication, request validation, and other common functionalities in a declarative manner.

🐇 The integration with RabbitMQ allows for reliable and asynchronous communication, enabling the microservice to handle high volumes of requests with ease.

🏗️ Whether you're building a monolithic application or a distributed system, this microservice provides a robust foundation for your project.


## Installation
To install the dependencies, run:
```bash
npm install
```

## Running the Application

### Development Mode
To start the application in development mode with hot-reloading:
```bash
npm run start:dev
```

### Production Mode
To start the application in production mode:
```bash
npm run start:prod
```

### Debug Mode
To start the application in debug mode:
```bash
npm run start:debug
```

## Environment Variables
The application uses the following environment variables, which should be defined in a [`.env`](.env) file at the root of the project:

```properties
PORT=3001
MODE=dev
RABBITMQ_URL=amqp://guest:guest@localhost:5672
DATABASE_URL=postgres://postgres:dima3raza@localhost:5432/template
```

## Scripts
The following scripts are available in the [`package.json`](package.json):

#### Update dependencies.
```bash
npm run update
```

#### Build the project.
```bash
npm run build
```

#### Format the code using Prettier.
```bash
npm run format
```

#### Start the application.
```bash
npm run start
```

#### Start the application in development mode.
```bash
npm run start:dev
```

#### Update ```@pieceowater-dev/lotof.lib.broadcaster``` dependency to latest version and start the application in development mode.
```bash
npm run start:dev:updt
```

#### Start the application in debug mode.
```bash
npm run start:debug
```

#### Start the application in production mode.
```bash
npm run start:prod
```

#### Lint the code using ESLint.
```bash
npm run lint
```

#### Run unit tests.
```bash
npm run test
```

#### Run unit tests in watch mode.
```bash
npm run test:watch
```

#### Run unit tests with coverage.
```bash
npm run test:cov
```

#### Run unit tests in debug mode.
```bash
npm run test:debug
```

#### Run end-to-end tests.
```bash
npm run test:e2e
```


## Testing
To run the unit tests:
```bash
npm run test
```

To run the unit tests in watch mode:
```bash
npm run test:watch
```

To run the unit tests with coverage:
```bash
npm run test:cov
```

To run the end-to-end tests:
```bash
npm run test:e2e
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
![PCWT Dev Logo](https://avatars.githubusercontent.com/u/168465239?s=50)
### [PCWT Dev](https://github.com/pieceowater-dev)