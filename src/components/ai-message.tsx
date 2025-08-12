import { type UIMessage } from "@ai-sdk/react";

interface AIMessageProps {
  message: UIMessage;
}

export function AIMessage({ message }: AIMessageProps) {
  const textParts = message.parts.filter((part) => part.type === "text");

  return (
    <div className="ai-msg">
      <div className="avatar-ai">AI</div>
      <div className="bubble-ai">
        {textParts.map((part, index) => (
          <p key={index}>{part.text}</p>
        ))}
      </div>
    </div>
  );
}
