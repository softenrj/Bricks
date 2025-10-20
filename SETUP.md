# Setup Guide for BRICKS AI

This guide will help you get BRICKS AI up and running on your local machine for development and testing purposes.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js** (version 18.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** or **yarn** package manager
  - npm comes bundled with Node.js
  - Or install yarn: `npm install -g yarn`

- **Git** for version control
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Recommended Tools

- **Visual Studio Code** - Recommended IDE with TypeScript support
- **GitHub Desktop** - GUI for Git operations (optional)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/softenrj/bricks-ai.git
cd bricks-ai
```

### 2. Install Dependencies

```bash
npm install
# or if using yarn
yarn install
```

### 3. Environment Setup

#### Firebase Configuration

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)

2. Enable the following services in your Firebase project:
   - Authentication
   - Firestore Database
   - Storage (optional)
   - Hosting (optional)

3. Get your Firebase configuration:
   - Go to Project Settings > General > Your apps
   - Click "Add app" and select Web app (</>)
   - Copy the configuration object

4. Set up the configuration file:
   ```bash
   cp src/config/firebaseConfig.example.ts src/config/firebaseConfig.ts
   ```

5. Edit `src/config/firebaseConfig.ts` and replace the placeholder values with your actual Firebase config:

   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };

   export const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🔧 Development Commands

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Additional Commands

```bash
# Clean install dependencies
rm -rf node_modules package-lock.json && npm install

# Clear Next.js cache
rm -rf .next

# Run tests (when available)
npm run test
```

## 🌐 Browser Support

BRICKS AI supports the following browsers:

- **Chrome** (recommended) - Version 90+
- **Firefox** - Version 88+
- **Safari** - Version 14+
- **Edge** - Version 90+

## 🔒 Security Notes

- Never commit your `src/config/firebaseConfig.ts` file to version control
- Keep your Firebase service account keys secure
- Use environment variables for sensitive configuration in production

## 🐛 Troubleshooting

### Common Issues

#### Port 3000 Already in Use

If you see "Port 3000 is already in use", try:

```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
npm run dev -- -p 3001
```

#### Firebase Connection Issues

1. Verify your Firebase config is correct
2. Check that your Firebase project is properly configured
3. Ensure your IP is allowed in Firebase security rules (for development)

#### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

#### TypeScript Errors

```bash
# Check types
npm run type-check

# Fix common issues
npm run lint -- --fix
```

## 📞 Getting Help

If you encounter issues:

1. Check the [Issues](https://github.com/softenrj/bricks-ai/issues) page
2. Review the [Contributing Guide](CONTRIBUTING.md)
3. Contact the maintainers at rjsharmase@gmail.com

## 🚀 Next Steps

Once you have BRICKS AI running locally:

1. Explore the dashboard and create your first project
2. Try the AI chat features
3. Experiment with the code editor
4. Check out the project documentation

Happy coding with BRICKS AI! 🚀
