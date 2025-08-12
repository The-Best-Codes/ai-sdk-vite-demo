import type { UIMessage } from "ai";

interface UserMessageProps {
  message: UIMessage;
}

export function UserMessage({ message }: UserMessageProps) {
  const textParts = message.parts.filter((part) => part.type === "text");

  return (
    <div className="user-msg">
      <div className="bubble-user">
        {textParts.map((part, index) => (
          <p key={index}>{part.text}</p>
        ))}
      </div>
      <div className="avatar-user">U</div>
    </div>
  );
}
