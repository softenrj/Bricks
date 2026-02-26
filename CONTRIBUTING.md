# Contributing to BRICKS AI

Thank you for your interest in contributing to BRICKS AI! We welcome contributions from the community to help improve and expand our AI-powered coding IDE.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Development Guidelines](#development-guidelines)
- [Reporting Issues](#reporting-issues)

## 🤝 Code of Conduct

This project adheres to a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/softenrj/bricks-ai.git
   cd bricks-ai
   ```

3. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables**:
   - Copy `src/config/firebaseConfig.example.ts` to `src/config/firebaseConfig.ts`
   - Fill in your Firebase configuration values

5. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser** and navigate to `http://localhost:3000`

## 💡 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes** - Fix existing issues
- ✨ **Features** - Add new functionality
- 📚 **Documentation** - Improve docs and guides
- 🎨 **UI/UX** - Enhance user interface and experience
- 🧪 **Tests** - Add or improve test coverage
- 🔧 **Tools** - Development tools and scripts

### Finding Issues to Work On

- Check the [Issues](https://github.com/softenrj/bricks-ai/issues) tab
- Look for issues labeled `good first issue` or `help wanted`
- Comment on an issue to indicate you're working on it

## 🔄 Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our development guidelines

3. **Test your changes** thoroughly

4. **Commit your changes** with descriptive messages:
   ```bash
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

### Commit Message Guidelines

We follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 📝 Development Guidelines

### Code Style

- Use **TypeScript** for all new code
- Follow the existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### File Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
└── utils/              # Helper utilities
```

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test both happy path and error scenarios

### Performance

- Optimize bundle size
- Use React.memo for expensive components
- Implement proper loading states
- Avoid unnecessary re-renders

## 🐛 Reporting Issues

When reporting bugs or requesting features:

1. **Check existing issues** to avoid duplicates
2. **Use issue templates** when available
3. **Provide detailed information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

## 📞 Getting Help

If you need help or have questions:

- 📧 **Email**: rjsharmase@gmail.com
- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs via GitHub Issues

## 📄 License

By contributing to BRICKS AI, you agree that your contributions will be licensed under the same license as the project: the **Apache License 2.0**. See [`LICENSE`](LICENSE) for details.

---

Thank you for contributing to BRICKS AI! 🚀
