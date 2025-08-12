# AI SDK + Vite (no backend) Demo

This is a simple demo of using AI SDK v5 with Vite and no backend API route for streaming AI responses. It demonstrates how to integrate AI SDK into a Vite project without the need for a backend server. Don't mind the horrible UI, I promise I write better UIs than this for my real projects 😀

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/The-Best-Codes/ai-sdk-vite-demo.git
   cd ai-sdk-vite-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the demo in action.

---

## How it works

We can't use `@ai-sdk/react` directly in Vite because it requires a backend API route (e.g., `/api/chat`) to receive AI response streams from.
