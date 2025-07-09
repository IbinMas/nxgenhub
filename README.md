# NxGenHub

A modern web application built with React/Vite frontend and Express.js backend, featuring integrated email functionality and Docker deployment support.

## 📁 Project Structure

```
nxgenhub/
├── client/                 # React/Vite frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services and utilities
│   │   └── ...
│   ├── .env.development    # Development environment variables
│   ├── .env.production     # Production environment variables
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Express.js backend application
│   ├── src/
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Server entry point
│   ├── .env                # Server environment variables
│   ├── .env.example        # Environment template
│   └── package.json
├── docker-compose.yml      # Docker deployment configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nxgenhub
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Configure environment variables** (see [Environment Configuration](#environment-configuration))

4. **Start the development servers**
   ```bash
   # Terminal 1 - Start the backend server
   cd server
   npm run dev

   # Terminal 2 - Start the frontend client
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## ⚙️ Environment Configuration

### Client Environment Variables

Create the following files in the `client/` directory:

**`.env.development`**
```env
VITE_BACKEND_URL=http://localhost:3001
```

**`.env.production`**
```env
VITE_BACKEND_URL=/api
```

### Server Environment Variables

Create a `.env` file in the `server/` directory based on `.env.example`:

```env
# Server Configuration
PORT=3001

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# Email Recipients
RECIPIENT_EMAIL=contact@yourcompany.com

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,https://yourdomain.com
```

### SMTP Setup

For Gmail SMTP:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the generated password in `SMTP_PASS`

## 🏃‍♂️ Running the Application

### Development Mode

**Option 1: Manual Start**
```bash
# Start backend (Terminal 1)
cd server
npm run dev

# Start frontend (Terminal 2)
cd client
npm run dev
```

**Option 2: Concurrent Start** (if configured)
```bash
# From project root
npm run dev
```

### Production Build

```bash
# Build client
cd client
npm run build

# Start production server
cd ../server
npm start
```

## 🐳 Docker Deployment

### Using Docker Compose

1. **Configure environment variables**
   - Ensure server `.env` file is properly configured
   - Update `docker-compose.yml` with production settings

2. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Application will be available on the configured port
   - Internal container communication handled automatically

### Docker Commands

```bash
# Build and start in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild specific service
docker-compose up --build client
docker-compose up --build server
```

## 📡 API Endpoints

### Email API

**POST** `/api/send-email`

Send email through the contact form system.

**Request Body:**
```json
{
  "formType": "contact|expert|getstarted",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here",
  "company": "Company Name (optional)",
  "phone": "Phone Number (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## 🔧 Development Features

### Vite Proxy Configuration

The Vite development server is configured to proxy API requests:
- Client requests to `/api/*` are forwarded to `http://localhost:3001/api/*`
- This eliminates CORS issues during development
- Configured in `client/vite.config.ts`

### Hot Reload

- Frontend: Automatic reload on file changes
- Backend: Automatic restart with nodemon (if configured)

## 🛠️ Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure `CORS_ORIGIN` in server `.env` includes your client URL
- Check that the client is making requests to the correct backend URL

**2. Email Not Sending**
- Verify SMTP credentials in server `.env`
- Check that Gmail App Password is correctly configured
- Ensure SMTP_HOST and SMTP_PORT are correct for your provider

**3. Client Can't Connect to Server**
- Verify server is running on port 3001
- Check `VITE_BACKEND_URL` in client environment files
- Ensure Vite proxy configuration is correct

**4. Docker Issues**
- Ensure Docker daemon is running
- Check that ports are not already in use
- Verify environment variables are properly set in containers

**5. Build Failures**
- Clear node_modules and reinstall dependencies
- Check for version compatibility issues
- Ensure all environment variables are set

### Debug Commands

```bash
# Check if ports are in use
lsof -i :3001
lsof -i :5173

# View Docker container logs
docker-compose logs client
docker-compose logs server

# Test API endpoint
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"formType":"contact","name":"Test","email":"test@example.com","message":"Test message"}'
```

## 📝 Scripts

### Client Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Server Scripts
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run build        # Build TypeScript (if applicable)
```