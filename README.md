# Todo App

A modern and user-friendly todo list application built with React, TypeScript, and Vite.

## Features

- ✨ Modern and clean interface
- 🌓 Dark/Light theme support
- 🌍 Multi-language support (English/Turkish)
- 💾 Automatic data saving (LocalStorage)
- 📱 Responsive design
- ⚡ Fast and performant structure

## Technologies

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Styling library
- [Intlayer](https://github.com/intlayer/intlayer) - Modern internationalization (multi-language support)

## Installation

1. Clone the repository:
```bash
git clone [repo-url]
cd my-todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Usage

- Enter text and click "Add" to add a new task
- Check the checkbox to mark a task as completed
- Click "Delete" to remove a task
- Click 🌙/☀️ in the top right to toggle dark/light theme
- Use the language dropdown in the top right to change the application language (supports 15+ languages)

## Project Structure

```
src/
├── components/         # UI components
│   ├── TodoInput.tsx  # Task input form
│   ├── TodoItem.tsx   # Individual task component
│   └── TodoList.tsx   # Task list component
├── app.content.tsx    # Intlayer dictionary (all translations)
├── intlayer.config.ts # Intlayer configuration
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

## License

MIT