"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";

const SUGGESTED_PROMPTS = [
  "What did you build at Lemon Tree?",
  "How do you use AI in real work?",
  "What makes you different?",
];

interface Props {
  linkedinUrl: string;
}

export default function ChatInterface({ linkedinUrl }: Props) {
  const {
    messages,
    status,
    inputValue,
    setInputValue,
    sendMessage,
    isLimitReached,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-grid shadow-[0_2px_16px_rgba(10,37,64,0.07)]">
      {/* Identity row */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-terra flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold font-display">AS</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-navy font-body">Ankur Singh</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
            <p className="text-xs text-faint font-body">AI · powered by Claude</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="px-4 py-3 border-t border-grid min-h-36 max-h-72 overflow-y-auto flex flex-col gap-3"
      >
        {messages.length === 0 && (
          <>
            <div className="flex gap-2 items-start">
              <div className="w-6 h-6 rounded-full bg-terra flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[9px] font-bold font-display">AS</span>
              </div>
              <div className="bg-bg-deep rounded-lg rounded-tl-none px-3 py-2 max-w-xs">
                <p className="text-xs text-text font-body leading-relaxed">
                  Hey I&apos;m Ankur. Ask me anything about my work, how I
                  think, or what I&apos;m building next.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pl-8">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="border border-grid rounded-full px-3 py-1 text-[10px] text-muted font-body hover:border-faint hover:text-text transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-terra flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[9px] font-bold font-display">AS</span>
              </div>
            )}
            <div
              className={`flex flex-col gap-1 max-w-[75%] ${msg.role === "user" ? "items-end" : ""}`}
            >
              {msg.role === "assistant" ? (
                msg.paragraphs.map((para, pi) => (
                  <div
                    key={pi}
                    style={{ transitionDelay: `${pi * 50}ms` }}
                    className={`bg-bg-deep rounded-lg rounded-tl-none px-3 py-2 transition-all duration-[250ms] ease-out ${
                      pi < msg.visibleParagraphs
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1 pointer-events-none"
                    }`}
                  >
                    <p className="text-xs text-text font-body leading-relaxed">
                      {para}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-navy rounded-lg rounded-tr-none px-3 py-2">
                  <p className="text-xs text-bg font-body leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {status === "thinking" && (
          <div className="flex gap-2 items-start">
            <div className="w-6 h-6 rounded-full bg-terra flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-[9px] font-bold font-display">AS</span>
            </div>
            <div className="bg-bg-deep rounded-lg rounded-tl-none px-3 py-2">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="px-3 pb-3 pt-2 border-t border-grid">
        {isLimitReached ? (
          <div className="text-center py-2">
            <p className="text-xs text-muted font-body mb-2">
              Great conversation. Let&apos;s continue on LinkedIn.
            </p>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-terra font-body hover:text-terra-soft transition-colors"
            >
              Connect on LinkedIn →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={status === "thinking"}
              placeholder="Ask anything about Ankur's work..."
              maxLength={500}
              className="flex-1 border border-grid rounded-lg px-3 py-2 text-base sm:text-xs text-text font-body bg-bg placeholder:text-faint focus:outline-none focus:border-navy disabled:opacity-50"
            />
            <button
              type="submit"
              aria-label="→"
              disabled={status === "thinking" || !inputValue.trim()}
              className="bg-navy text-bg px-4 py-2 rounded-lg text-xs font-semibold font-body hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              →
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-xs text-terra font-body mt-1">
            Something went wrong. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
