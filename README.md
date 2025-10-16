<div align="center">

# BRICKS AI

<img src="public/landingPage/transparent-bricks.png" alt="Bricks AI Logo" width="120" height="120" />

**Turn Ideas into Code — Instantly.**

*Transform voice, text, or images into functional codebases directly in your browser.*

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)

</div>

---

## Overview

BRICKS AI is an innovative development platform that enables users to create software applications through multiple input modalities. By leveraging advanced AI and browser-based technologies, it transforms natural language descriptions, voice commands, and visual sketches into complete, functional codebases.

## Key Features

### Core Capabilities
- **Multi-Modal Input**: Accept voice commands, text descriptions, and image sketches
- **Instant Code Generation**: Transform ideas into functional applications in seconds
- **Browser-Based Environment**: Develop, test, and deploy without local setup
- **Real-Time Collaboration**: Work simultaneously with team members
- **Integrated Development Tools**: Professional code editor with terminal access

### Technical Features
- Monaco Editor with syntax highlighting and IntelliSense
- WebContainer API for Node.js runtime in browser
- Real-time communication via Socket.io
- Firebase authentication and data persistence
- Redux Toolkit for state management

## Technology Stack

### Frontend Framework
- **Next.js 15.5.0** - React framework for production
- **React 19.1.0** - Component-based user interface library
- **TypeScript 5.0** - Type-safe JavaScript development

### Development Tools
- **Monaco Editor** - Browser-based code editing environment
- **XTerm.js** - Terminal emulator for command execution
- **Tailwind CSS 4.0** - Utility-first CSS framework

### Backend & Infrastructure
- **WebContainer API** - Node.js runtime in browser environment
- **Firebase** - Authentication, database, and hosting services
- **Socket.io** - Real-time bidirectional communication
- **Axios** - HTTP client for API interactions

### Additional Libraries
- **Redux Toolkit** - Predictable state container
- **Framer Motion** - Production-ready motion library
- **React Resizable Panels** - Flexible layout management
- **JSZip** - Client-side file compression
- **html2canvas** - Screenshot generation

## Usage

### Getting Started
1. Navigate to the application URL
2. Create an account or sign in
3. Click "Build with AI" to start a new project

<!-- ### Input Methods

#### Voice Input
- Click the microphone icon
- Provide verbal description of your application
- BRICKS AI processes the audio and generates corresponding code

#### Text Input
- Enter detailed descriptions of your application requirements
- Specify technologies, features, and design specifications
- Submit for instant code generation

#### Visual Input
- Upload wireframes, mockups, or sketches
- AI analyzes visual elements to understand requirements
- Generates code structure based on visual input -->

### Development Workflow
1. **Generate**: Create initial codebase from your input
2. **Edit**: Modify code using the integrated Monaco editor
3. **Test**: Execute code in the browser environment
4. **Deploy**: Export project or deploy directly

## Project Structure

```
bricks/
├── public/                    # Static assets and media files
│   ├── favicon/              # Application icons
│   ├── icons/                # UI icon assets
│   ├── landingPage/          # Landing page resources
│   ├── soundtrack/           # Audio files
│   └── video/                # Video content
├── src/
│   ├── app/                  # Next.js application directory
│   │   ├── (dashboard)/      # Dashboard route groups
│   │   ├── (ide)/           # IDE route groups
│   │   ├── globals.css       # Global stylesheet
│   │   ├── layout.tsx        # Root layout component
│   │   └── page.tsx          # Home page component
│   ├── components/           # React components
│   │   ├── Auth/            # Authentication components
│   │   ├── CodeEditor/      # Code editing interface
│   │   ├── Dashboard/       # Dashboard views
│   │   ├── IdeLayOut/       # IDE layout components
│   │   ├── LandingPage/     # Landing page sections
│   │   ├── Project/         # Project management
│   │   └── ui/              # Reusable UI components
│   ├── config/              # Configuration files
│   ├── context/             # React context providers
│   ├── feature/             # Feature implementations
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   ├── service/             # API service layer
│   ├── socket/              # WebSocket connections
│   ├── store/               # Redux store configuration
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── types/                   # Additional type definitions
├── .gitignore               # Git ignore patterns
├── components.json          # UI component configuration
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code analysis

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+


## Author

**Raj**
- GitHub: [@softenrj](https://github.com/softenrj)
- LinkedIn: [Raj](https://www.linkedin.com/in/raj-sharma-23447527b/)
- Email: [rjsharmase@gmail.com]


---

<div align="center">

**Built with Next.js, React, and modern web technologies.**

</div>
