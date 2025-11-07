# Sentinel App

This is a desktop application designed for reviewing and managing product attribute data. It is built using a modern web technology stack and packaged for cross-platform use with Electron.

## Tech Stack

- **Frontend:** React, TypeScript
- **UI:** Material-UI (MUI)
- **Build Tool:** Vite
- **Desktop Framework:** Electron
- **State Management:** Zustand

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd sentinel-app
    ```

2.  **Install dependencies:**
    Run the following command in the project root to install all the necessary packages.
    ```bash
    npm install
    ```

## Development

To run the application in development mode with hot-reloading for both the React frontend and the Electron main process, use the following command:

```bash
npm run dev
```

This will launch the application window, and any changes you make to the code will be reflected automatically.

## Building the Application

You can build the application to create distributable installers for macOS and Windows.

### For macOS (.dmg)

To build the application for macOS, run the following command:

```bash
npm run build:electron
```

### For Windows (.exe)

To build the application for Windows, run the following command. This can be run on macOS or Windows.

```bash
npm run build:electron -- --win
```

### Build Output

After a successful build, the installers will be located in the `release/` directory at the root of the project.
