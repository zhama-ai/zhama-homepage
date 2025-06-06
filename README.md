# Zhama Homepage

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- ⚡ Built with Next.js 15 and React 19
- 🎨 Styled with Tailwind CSS
- 🌙 Dark mode support with next-themes
- 🌍 Internationalization with react-i18next
- ✨ Smooth animations with Framer Motion
- 🐳 Docker support for containerized deployment
- 🚀 CI/CD pipeline with GitHub Actions
- 🔒 Security scanning and dependency review

## Getting Started

### Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Docker Development

To run the application in development mode with Docker:

```bash
# Build and run development container
docker-compose --profile dev up --build

# Or use npm scripts
npm run docker:build
npm run docker:run
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Docker Deployment

### Building the Docker Image

```bash
# Build production image
docker build -t zhama-homepage .

# Run the container
docker run -p 3000:3000 zhama-homepage
```

### Using Docker Compose

```bash
# Run production version
docker-compose up -d

# Run development version
docker-compose --profile dev up -d
```

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline with GitHub Actions:

### Workflows

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Runs on push to `main`/`develop` and pull requests
   - Tests on Node.js 18.x and 20.x
   - Performs linting, building, and type checking
   - Security scanning with npm audit
   - Multi-platform Docker image building

2. **Deployment** (`.github/workflows/deploy.yml`)
   - Triggered on push to `main` or version tags
   - Builds and pushes Docker images to registry
   - Ready for server deployment

3. **Dependency Review** (`.github/workflows/dependency-review.yml`)
   - Reviews new dependencies in pull requests
   - Scans for security vulnerabilities

### Required Secrets

To use the CI/CD pipeline, configure these secrets in your GitHub repository:

- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password or access token

Optional secrets for server deployment:
- `HOST`: Server hostname/IP
- `USERNAME`: SSH username
- `KEY`: SSH private key

## Project Structure

```
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── lib/          # Utility functions
├── public/           # Static assets
├── .github/          # GitHub Actions workflows
├── Dockerfile        # Production Docker image
├── Dockerfile.dev    # Development Docker image
├── docker-compose.yml # Docker Compose configuration
└── ...
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment Options

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Docker Deployment

For containerized deployment on any platform:

1. Push your code to GitHub
2. The CI pipeline will build and push Docker images
3. Pull and run the image on your server:

```bash
docker pull your-username/zhama-homepage:latest
docker run -d -p 3000:3000 --name zhama-homepage your-username/zhama-homepage:latest
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
