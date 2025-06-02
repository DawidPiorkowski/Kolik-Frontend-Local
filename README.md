# Kolik Frontend

**Version**: 0.0.1  
A modern React + TypeScript frontend for the **Kolik** shopping and price comparison platform.

## 📝 Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [License](#license)
- [Contact](#contact)

## 📌 Description

Kolik Frontend is a modern, fast, and responsive React + TypeScript web interface for the Kolik shopping and price comparison platform.  
It allows users to browse and compare products from different retailers, helping them find the best deals.  
Built with Vite and Tailwind CSS, it offers a smooth user experience and connects seamlessly with a backend API for real-time data.

Key features include category-based browsing, product search, and price comparison across vendors.  
The frontend is designed to be lightweight and extensible, making it easy to integrate new APIs or expand functionality.

## ✅ Prerequisites

- **Node.js** ≥ 16.x
- **npm** ≥ 8.x _(or yarn ≥ 1.x)_
- A backend API running at `http://localhost:8000/api` with CORS enabled.

## ⚙️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DawidPiorkowski/Kolik-Frontend-Local
   cd kolik-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

## 🔧 Configuration

The default API endpoint is:

```
http://localhost:8000/api
```

To change it:

1. Open `src/config.ts`.
2. Modify the `API_BASE` constant to match your API URL.

## 🚀 Usage

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Access the app at: [http://localhost:5173](http://localhost:5173)

## 📂 Available Scripts

- `dev`: Start development server.
- `build`: Build the app for production.
- `preview`: Preview the production build.

## 🗂 Project Structure

```
kolik-frontend/
├── public/                     # Static assets
├── src/                        # Main application source code
│   ├── components/             # Reusable React components
│   ├── pages/                  # Application views/pages
│   ├── services/               # API service utilities
│   └── App.tsx                 # Root component
├── index.html                  # HTML template
├── package.json                # Project metadata and dependencies
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite build tool configuration
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

For questions, suggestions, or support, feel free to contact the maintainer:  
**Maintainer** – [DawidPiorkowski on GitHub](https://github.com/DawidPiorkowski)
