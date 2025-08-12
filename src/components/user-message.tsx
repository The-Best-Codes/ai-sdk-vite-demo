import type { UIMessage } from "ai";

interface UserMessageProps {
  message: UIMessage;
}

export function UserMessage({ message }: UserMessageProps) {
  const textParts = message.parts.filter((part) => part.type === "text");

  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="flex-1">
        <div className="bg-blue-500 text-white rounded-lg p-4 max-w-md ml-auto">
          {textParts.map((part, index) => (
            <p key={index} className="whitespace-pre-wrap">
              {part.text}
            </p>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-medium">U</span>
      </div>
    </div>
  );
}
