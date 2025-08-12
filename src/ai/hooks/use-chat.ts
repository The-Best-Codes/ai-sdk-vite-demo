import {
  type UIMessage,
  type UseChatOptions,
  useChat as useChatSDK,
} from "@ai-sdk/react";
import { type ChatInit, type LanguageModel } from "ai";
import { useEffect, useRef } from "react";
import { CustomChatTransport } from "../custom-chat-transport";

type CustomChatOptions = Omit<ChatInit<UIMessage>, "transport"> &
  Pick<UseChatOptions<UIMessage>, "experimental_throttle" | "resume">;

// This is a wrapper around the AI SDK's useChat hook
// It implements model switching and uses the custom chat transport,
// making a nice reusable hook for chat functionality.
export function useChat(model: LanguageModel, options?: CustomChatOptions) {
  const transportRef = useRef<CustomChatTransport | null>(null);

  if (!transportRef.current) {
    transportRef.current = new CustomChatTransport(model);
  }

  useEffect(() => {
    if (transportRef.current) {
      transportRef.current.updateModel(model);
    }
  }, [model]);

  const chatResult = useChatSDK({
    transport: transportRef.current,
    ...options,
  });

  return chatResult;
}
