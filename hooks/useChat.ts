"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "chat_msg_count";
const MAX_MESSAGES = 10;
const STAGGER_MS = 300;

export type Message = {
  role: "user" | "assistant";
  content: string;
  paragraphs: string[];
  visibleParagraphs: number;
};

export type ChatStatus = "idle" | "thinking" | "error";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [inputValue, setInputValue] = useState("");
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    const count = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
    if (count >= MAX_MESSAGES) setIsLimitReached(true);
  }, []);

  const revealParagraphs = useCallback(
    (msgIndex: number, total: number) => {
      for (let i = 1; i <= total; i++) {
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((m, idx) =>
              idx === msgIndex ? { ...m, visibleParagraphs: i } : m
            )
          );
        }, i * STAGGER_MS);
      }
    },
    []
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || status === "thinking" || isLimitReached) return;

      const userMsg: Message = {
        role: "user",
        content: text,
        paragraphs: [text],
        visibleParagraphs: 1,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setStatus("thinking");

      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
        });

        if (!res.ok) {
          setStatus("error");
          return;
        }

        const data = (await res.json()) as {
          reply: string;
          paragraphs: string[];
        };

        const assistantMsg: Message = {
          role: "assistant",
          content: data.reply,
          paragraphs: data.paragraphs,
          visibleParagraphs: 0,
        };

        setMessages((prev) => {
          const next = [...prev, assistantMsg];
          const msgIndex = next.length - 1;
          setTimeout(() => revealParagraphs(msgIndex, data.paragraphs.length), 0);
          return next;
        });

        setStatus("idle");

        const newCount =
          parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10) + 1;
        localStorage.setItem(STORAGE_KEY, String(newCount));
        if (newCount >= MAX_MESSAGES) setIsLimitReached(true);
      } catch {
        setStatus("error");
      }
    },
    [messages, status, isLimitReached, revealParagraphs]
  );

  return {
    messages,
    status,
    inputValue,
    setInputValue,
    sendMessage,
    isLimitReached,
  };
}
