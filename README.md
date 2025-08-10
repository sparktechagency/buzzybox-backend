# Project Name

This is a template project for backend development using Typescript, Node.js, Express, Mongoose, Bcrypt, JWT, NodeMailer, Multer, ESLint, and Prettier. The aim is to reduce setup time for new backend projects.

## Features

- **Authentication API:** Complete authentication system using JWT for secure token-based authentication and bcrypt for password hashing.
- **File Upload:** Implemented using Multer with efficient file handling and short-term storage.
- **Data Validation:** Robust data validation using Zod and Mongoose schemas.
- **Code Quality:** Ensured code readability and quality with ESLint and Prettier.
- **Email Service:** Sending emails through NodeMailer.
- **File Handling:** Efficient file deletion using `fs.unlink`.
- **Environment Configuration:** Easy configuration using a `.env` file.
- **Logging:** Logging with Winston and file rotation using DailyRotateFile.
- **API Request Logging:** Logging API requests using Morgan.

## Tech Stack

- Typescript
- Node.js
- Express
- Mongoose
- Bcrypt
- JWT
- NodeMailer
- Multer
- ESLint
- Prettier
- Winston
- Daily-winston-rotate-file
- Morgen
- Socket

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Create a `.env` file:**

   In the root directory of the project, create a `.env` file and add the following variables. Adjust the values according to your setup.

   ```env
   # Basic
   NODE_ENV=development
   DATABASE_URL=mongodb://127.0.0.1:27017/buzzybox
   IP_ADDRESS=10.10.7.7
   PORT=5001

   # Bcrypt
   BCRYPT_SALT_ROUNDS=12
   #FRONTEND
   FRONTEND_URL=http://10.10.7.7:3003

   # JWT
   JWT_ACCESS_TOKEN_SECRET=1d7bfb6c2c199f5d49fd5ac76b924bff3dbd4b5ffda4bb2076a3b68a56fd05e6
   JWT_REFRESH_TOKEN_SECRET=8c019a5a5e4f345c34d781b11d78f95799224d4b8c94d3d55dbf8006a6432d33
   JWT_SECRET=jwt_secret
   JWT_ACCESS_TOKEN_EXPIRED_IN=14d
   JWT_REFRESH_TOKEN_EXPIRED_IN = 30d
   JWT_RESET_TOKEN_EXPIRED_IN = 1h

   # Email (for mail sending)
   EMAIL_FROM=your_email
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_app_password
   EMAIL_PORT=587
   EMAIL_HOST=smtp.gmail.com

   # Stripe
   STRIPE_PRICE_ID=your_strip_price_id
   STRIPE_SECRET_KEY=your_strip_secret_key
   STRIPE_PUBLIC_KEY=your_strip_public_key
   STRIPE_WEBHOOK_SECRET=your_strip_webhook_secret
   ```

4. **Run the project:**

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn run dev
   ```

### Running the Tests

Explain how to run the automated tests for this system.

```bash
npm test
```
