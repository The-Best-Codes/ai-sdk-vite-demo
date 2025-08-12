import { type UIMessage } from "@ai-sdk/react";

interface AIMessageProps {
  message: UIMessage;
}

export function AIMessage({ message }: AIMessageProps) {
  const textParts = message.parts.filter((part) => part.type === "text");

  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-medium">AI</span>
      </div>
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          {textParts.map((part, index) => (
            <p key={index} className="text-gray-800 whitespace-pre-wrap">
              {part.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
