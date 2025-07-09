# NxtgenHub - IT Consulting Website

A modern React application with Node.js backend for IT consulting services, featuring email integration and Docker deployment.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

### 1. Environment Setup

Create or update your `.env` file with SMTP credentials:

```bash
# SMTP Configuration for Email Service
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-smtp-password
SMTP_FROM=your-from-email@domain.com

# Email Recipients
RECIPIENT_EMAIL=recipient@example.com

# Server Configuration
PORT=80
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=http://localhost
```

### 2. Docker Deployment (Recommended)

```bash
# Build and start the application
docker-compose up --build -d

# Check logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### 3. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Architecture

### Frontend (React + Vite)
- Modern React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- shadcn/ui components

### Backend (Node.js + Express)
- Express.js server
- SMTP email handling via Nodemailer
- CORS enabled
- Health check endpoints

### Docker Setup
- Multi-stage build for optimization
- Frontend served on port 80
- Backend API on same container
- Health checks and logging
- Resource limits for production

## 📧 Email Integration

The application uses Brevo SMTP for email sending:

- **Contact forms**: Automatically send emails to configured recipients
- **User confirmations**: Send confirmation emails to form submitters
- **Expert consultations**: Handle consultation requests
- **Onboarding**: Process new client onboarding

## 🔧 API Endpoints

- `GET /health` - Health check
- `POST /api/send-email` - Send email via SMTP
- `POST /send` - Legacy email endpoint

## 🌐 Access Points

- **Frontend**: http://localhost
- **Health Check**: http://localhost/health
- **API**: http://localhost/api/send-email

## 🛠️ Development Commands

```bash
# Frontend development
npm run dev

# Build frontend
npm run build

# Backend development (in server directory)
cd server
npm run dev

# Build backend
cd server
npm run build
```

## 🐳 Docker Commands

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f nxtgenhub-app

# Stop services
docker-compose down

# Rebuild without cache
docker-compose build --no-cache
```

## 🔍 Troubleshooting

### Common Issues

1. **Port 80 Permission Issues**
   ```bash
   # Use different port
   # Edit docker-compose.yml: "8080:80"
   # Access via http://localhost:8080
   ```

2. **SMTP Connection Issues**
   - Verify SMTP credentials in `.env`
   - Check Brevo service status
   - Test with curl: `curl -X POST http://localhost/health`

3. **Docker Build Failures**
   ```bash
   # Clean build
   docker-compose down
   docker system prune -f
   docker-compose up --build --no-cache
   ```

4. **Environment Variables Not Loading**
   - Ensure `.env` file exists in root directory
   - Check file permissions
   - Verify docker-compose.yml has `env_file: - .env`

### Logs and Monitoring

```bash
# Application logs
docker-compose logs nxtgenhub-app

# Follow logs in real-time
docker-compose logs -f

# Container status
docker-compose ps

# Resource usage
docker stats nxtgenhub-app
```

## 🚀 Production Deployment

### Security Considerations
1. Use HTTPS with reverse proxy (nginx)
2. Set strong SMTP passwords
3. Configure firewall rules
4. Regular security updates
5. Monitor logs and metrics

### Performance Optimization
1. Enable gzip compression
2. Use CDN for static assets
3. Implement caching strategies
4. Monitor resource usage
5. Scale horizontally if needed

## 📝 Features

- ✅ Responsive design
- ✅ Contact forms with email integration
- ✅ Expert consultation requests
- ✅ Client onboarding process
- ✅ Blog functionality
- ✅ Service showcase
- ✅ Docker containerization
- ✅ Health monitoring
- ✅ SMTP email delivery
- ✅ User confirmation emails

## 🤝 Support

For issues or questions:
1. Check application logs: `docker-compose logs -f`
2. Verify environment configuration
3. Test email functionality via health endpoints
4. Review Docker container status

## 📄 License

© 2024 NxtgenHub. All rights reserved.
