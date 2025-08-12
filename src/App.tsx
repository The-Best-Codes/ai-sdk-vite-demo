import { useState } from "react";
import { useChat } from "./ai/hooks/use-chat";
import { google } from "./ai/providers/google";
import { AIMessage } from "./components/ai-message";
import { UserMessage } from "./components/user-message";

function App() {
  const model = google("gemini-2.0-flash");
  // Notice that the useChat hook below it not the useChat hook from @ai-sdk/react,
  // It's our custom wrapper from ./ai/hooks/use-chat.ts
  const { messages, sendMessage, status, error } = useChat(model, {
    /* options */
  });

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-inner">
          <h1>AI Chat</h1>
        </div>
      </header>

      <section className="chat-window">
        {messages.map((message, index) =>
          message.role === "user" ? (
            <UserMessage message={message} key={index} />
          ) : (
            <AIMessage message={message} key={index} />
          ),
        )}
      </section>

      <footer className="input-area">
        {status === "error" && (
          <div className="input-error">
            Error: {error?.message || "Unknown error"}
          </div>
        )}
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              sendMessage({ text: inputValue });
              setInputValue("");
            }
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={status !== "ready"}
          placeholder={status !== "ready" ? "Thinking..." : "Message AI..."}
          className="message-input"
        />
      </footer>
    </div>
  );
}

export default App;
