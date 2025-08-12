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
Instead, we create an in-browser "transport layer" that runs the AI SDK's
`streamText()` function, which works client-side. There are three main pieces to make the trick work:

1. `CustomChatTransport` (`src/ai/custom-chat-transport.ts`) implements the
   AI SDK's `ChatTransport` interface. We replace `reconnectToStream` with a no-op function and use `streamText` inside our custom `sendMessages` function, converting the output of `streamText` into a UI message stream (instead of model messages).

2. `useChat` (`src/ai/hooks/use-chat.ts`), a thin React hook that swaps
   the underlying model reference and forwards everything else to
   `@ai-sdk/react`, so you get `messages`, `sendMessage`, etc., but never hit
   a network endpoint.

3. A Vite client `.env` key

   ```toml
   VITE_GOOGLE_GENERATIVE_AI_API_KEY=replace-this-with-your-key
   ```

   is used with `createGoogleGenerativeAI` at `src/ai/providers/google.ts`.

All inference happens client-side and nothing ever leaves the browser except the
HTTPS call to the AI provider (Google AI in this case).

## Use a different provider

If you wanted to use this with a different provider, you can simply install the related AI SDK provider package and create a new provider in `src/ai/providers/`. Let's say you want to use OpenAI. Install `@ai-sdk/openai`:

```bash
npm install @ai-sdk/openai
```

Then create a new provider in `src/ai/providers/openai.ts`:

```typescript
import { createOpenAI } from "@ai-sdk/openai";

export const openai = createOpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});
```

Add your API key to the `.env` file:

```toml
VITE_OPENAI_API_KEY=replace-this-with-your-key
```

Then use the `openai` provider in your app instead (replace the `google` import with `openai`):

```diff
import { useState } from "react";
import { useChat } from "./ai/hooks/use-chat";
-import { google } from "./ai/providers/google";
+import { openai } from "./ai/providers/openai";
import { AIMessage } from "./components/ai-message";
import { UserMessage } from "./components/user-message";

function App() {
-  const model = google("gemini-2.0-flash");
+  const model = openai("gpt-5-nano");
  const { messages, sendMessage, status, error } = useChat(model, {
    /* options */
  });
// ...
```

## Need help?

If you need help, feel free to reach out to me on [Discord](https://discord.com/invite/dKeuR9yfBs) or via [my website](https://bestcodes.dev).
