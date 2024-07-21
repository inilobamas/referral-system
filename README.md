# Referral System

## Description

The Referral System is a web application that allows users to register, refer other users, and track the earnings from referrals. The system supports a two-level referral mechanism where users can earn rewards for direct and indirect referrals.

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


