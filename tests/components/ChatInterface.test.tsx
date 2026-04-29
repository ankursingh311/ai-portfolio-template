import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { ChatStatus, Message } from "@/hooks/useChat";

const mockSendMessage = vi.fn();
const mockSetInputValue = vi.fn();

function mockChatState(overrides: Partial<{
  messages: Message[];
  status: ChatStatus;
  inputValue: string;
  isLimitReached: boolean;
}> = {}) {
  return {
    messages: [],
    status: "idle" as ChatStatus,
    inputValue: "",
    setInputValue: mockSetInputValue,
    sendMessage: mockSendMessage,
    isLimitReached: false,
    ...overrides,
  };
}

vi.mock("@/hooks/useChat", () => ({
  useChat: vi.fn(),
}));

import ChatInterface from "@/components/ChatInterface";
import { useChat } from "@/hooks/useChat";

const LINKEDIN = "https://linkedin.com/in/test";

describe("ChatInterface", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useChat).mockReturnValue(mockChatState());
  });

  it("shows initial greeting when no messages", () => {
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    expect(screen.getByText(/Hey — I'm Ankur/)).toBeInTheDocument();
  });

  it("shows suggested prompts when no messages", () => {
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    expect(screen.getByText("What did you build at Lemon Tree?")).toBeInTheDocument();
  });

  it("renders input and send button when idle", () => {
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "→" })).toBeInTheDocument();
  });

  it("input is disabled while thinking", () => {
    vi.mocked(useChat).mockReturnValue(mockChatState({ status: "thinking" }));
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("shows error message on error status", () => {
    vi.mocked(useChat).mockReturnValue(mockChatState({ status: "error" }));
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });

  it("shows LinkedIn nudge when limit reached", () => {
    vi.mocked(useChat).mockReturnValue(mockChatState({ isLimitReached: true }));
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    expect(screen.getByText(/Connect on LinkedIn/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Connect on LinkedIn/ })).toHaveAttribute(
      "href",
      LINKEDIN
    );
  });

  it("calls sendMessage on form submit", () => {
    vi.mocked(useChat).mockReturnValue(mockChatState({ inputValue: "test query" }));
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    fireEvent.submit(screen.getByRole("textbox").closest("form")!);
    expect(mockSendMessage).toHaveBeenCalledWith("test query");
  });

  it("calls sendMessage when suggested prompt clicked", () => {
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    fireEvent.click(screen.getByText("What did you build at Lemon Tree?"));
    expect(mockSendMessage).toHaveBeenCalledWith("What did you build at Lemon Tree?");
  });

  it("renders user message with navy bubble", () => {
    const msg: Message = {
      role: "user",
      content: "Hello Ankur",
      paragraphs: ["Hello Ankur"],
      visibleParagraphs: 1,
    };
    vi.mocked(useChat).mockReturnValue(mockChatState({ messages: [msg] }));
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    expect(screen.getByText("Hello Ankur")).toBeInTheDocument();
  });

  it("renders assistant message paragraphs", () => {
    const msg: Message = {
      role: "assistant",
      content: "First para.\n\nSecond para.",
      paragraphs: ["First para.", "Second para."],
      visibleParagraphs: 2,
    };
    vi.mocked(useChat).mockReturnValue(mockChatState({ messages: [msg] }));
    render(<ChatInterface linkedinUrl={LINKEDIN} />);
    expect(screen.getByText("First para.")).toBeInTheDocument();
    expect(screen.getByText("Second para.")).toBeInTheDocument();
  });
});
