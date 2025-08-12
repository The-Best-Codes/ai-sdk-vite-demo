import { google } from "./ai/providers/google";
import { useChat } from "./ai/hooks/use-chat";
import { UserMessage } from "./components/user-message";
import { AIMessage } from "./components/ai-message";
import { useState } from "react";

function App() {
  const model = google("gemini-2.0-flash");
  const { messages, sendMessage, status, error } = useChat(model, {
    /* options */
  });

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">AI Chat</h1>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {messages.map((message, index) =>
          message.role === "user" ? (
            <UserMessage message={message} key={index} />
          ) : (
            <AIMessage message={message} key={index} />
          ),
        )}
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 pb-6">
        {status === "error" && (
          <div className="text-red-500">
            Error: {error?.message || "Unknown error"}
          </div>
        )}
        <input
          onKeyDown={(e) => {
            // Send on enter but not shift enter
            if (e.key === "Enter" && !e.shiftKey) {
              sendMessage({
                text: inputValue,
              });
              setInputValue("");
            }
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={status !== "ready"}
          placeholder={status !== "ready" ? "Thinking..." : "Message AI..."}
        />
      </div>
    </div>
  );
}

export default App;
