# Laravel + React Template

A full-stack application template using Laravel 11 for the backend API and React with Vite for the frontend. This template includes authentication with Laravel Sanctum.

## Features

- **Backend**: Laravel 11 with API routes
- **Frontend**: React with Vite, Tailwind CSS for styling
- **Authentication**: Laravel Sanctum for API authentication
- **Database**: SQLite (easy setup) or MySQL (configurable)
- **Proxy**: Vite proxy for seamless API integration

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and npm
- SQLite or MySQL

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Acteus/Laravel-React-Template
   cd laravel-react-template
   ```

2. **Backend Setup**:
   - Install PHP dependencies:
     ```bash
     composer install
     ```
   - Copy the environment file:
     ```bash
     cp .env.example .env
     ```
   - Generate application key:
     ```bash
     php artisan key:generate
     ```
   - Configure database in `.env` (default is SQLite):
     ```env
     DB_CONNECTION=sqlite
     ```
     For MySQL:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=laravel
     DB_USERNAME=root
     DB_PASSWORD=
     ```
   - Run migrations:
     ```bash
     php artisan migrate
     ```
   - Start the Laravel server:
     ```bash
     php artisan serve
     ```
     The API will be available at `http://localhost:8000`.

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install Node.js dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
     The frontend will be available at `http://localhost:5173`.

## Usage

- **Register/Login**: Use the forms on the frontend to create an account or log in.
- **API Endpoints**:
  - `POST /api/register`: Register a new user
  - `POST /api/login`: Log in a user
  - `POST /api/logout`: Log out (requires authentication)
  - `GET /api/user`: Get current user (requires authentication)

## Configuration

- **CORS**: Configured for `http://localhost:3000`.
- **Sanctum**: Stateful domains set for `localhost:3000`.
- **Proxy**: Vite proxy forwards `/api` requests to Laravel.

## Development

- Backend: Changes in Laravel files require server restart.
- Frontend: Hot reload enabled with Vite.

## Building for Production

- **Frontend**:
  ```bash
  cd frontend
  npm run build
  ```
- **Backend**: Deploy as standard Laravel application.

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).
