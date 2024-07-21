<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Referral System

## Description

The Referral System is a web application that allows users to register, refer other users, and track the earnings from referrals. The system supports a two-level referral mechanism where users can earn rewards for direct and indirect referrals.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features

- User Registration and Login
- Two-Level Referral Mechanism
- Role-Based Access Control (RBAC)
- RESTful API Documentation with Swagger

## Technologies Used

- Node.js
- NestJS
- TypeORM
- SQLite (for development, replaceable with other databases)
- Swagger (for API documentation)
- Jest (for unit testing)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/referral-system.git
   cd referral-system
   
2. **Install dependencies:**

   ```sh
   npm install

## Usage

1. **Run the application:**

   ```sh
   npm run start

   The application will be available at http://localhost:3000.

## API Documentation
### Swagger API documentation is available at http://localhost:3000/api.

### API Endpoints
#### Authentication
- Register: POST /auth/register
- Login: POST /auth/login

#### Users (Protected)
- Get All Users: GET /users
- Get User by ID: GET /users/:id
- Get Referrals: GET /users/:id/referrals
- Delete User

#### Purchases (Protected)
- Get All Purchases: GET /purchases
- Create Purchase: POST /purchases
- Delete Purchase

## Testing

```sh
   npm run test
```

## Contributing
1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature-branch)
5. Open a pull request


## License
- This project is licensed under the MIT License.


