# OpenAPI Code Generator

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/OpenAPI-6BA539?style=for-the-badge&logo=openapiinitiative&logoColor=white" alt="OpenAPI" />
</div>

## 📋 Overview

OpenAPI Code Generator is a powerful web-based tool that simplifies the process of generating client and server code from OpenAPI specifications. With an intuitive interface and support for multiple programming languages and frameworks, it streamlines API development workflows.

## ✨ Features

- **Client & Server Code Generation**: Generate API clients or server stubs from OpenAPI specifications
- **Multiple Language Support**: Choose from a wide range of programming languages and frameworks
- **Flexible Input Options**: Upload JSON files, paste JSON directly, or fetch from URLs
- **Interactive Documentation**: View and explore your API with integrated Swagger UI
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Instant Downloads**: Get your generated code as downloadable packages

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/openapi-code-generator.git
   cd openapi-code-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Usage

1. **Select Generator Type**: Choose between client or server code generation
2. **Choose Language/Framework**: Select your preferred programming language or framework
3. **Provide OpenAPI Specification**: Upload a JSON file, paste JSON content, or enter a URL
4. **Generate Code**: Click the "Generate" button to create your code
5. **Download**: Once generated, download the code package

## 🖥️ Demo

![OpenAPI Code Generator Demo](https://via.placeholder.com/800x450.png?text=OpenAPI+Code+Generator+Demo)

## 🔍 How It Works

The OpenAPI Code Generator leverages the [Swagger Generator API](https://generator.swagger.io) to transform OpenAPI specifications into functional code. The application:

1. Parses your OpenAPI specification
2. Sends it to the Swagger Generator API
3. Retrieves the generated code package
4. Provides a download link for the package

## 🛠️ Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives with custom styling
- **API Documentation**: Swagger UI
- **HTTP Client**: Axios

## 📚 API Support

The generator supports OpenAPI specifications in version 3.0.x format. It can process specifications for RESTful APIs with various endpoint types, request/response schemas, and authentication methods.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Swagger Generator API](https://generator.swagger.io) for code generation capabilities
- [Swagger UI](https://swagger.io/tools/swagger-ui/) for API documentation visualization
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast development experience
