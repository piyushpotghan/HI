import { useState } from "react";

export default function WomenSafetyBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi, I’m SAFE SIREN.\nI’m here to help you stay safe.\nType 'help' if you’re in danger."
    }
  ]);

  const getReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("help") || msg.includes("emergency")) {
      return "🚨 EMERGENCY!\nCall 112 immediately or move to a safe place.";
    }
    if (msg.includes("police")) {
      return "👮 Police Helpline: 100 / 112";
    }
    if (msg.includes("women")) {
      return "📞 Women Helpline (India): 181 / 1091";
    }
    if (msg.includes("tips")) {
      return "🛡️ Safety Tips:\n• Share live location\n• Stay in lit areas\n• Trust instincts";
    }

    return "🤖 I can help with emergency, police, helplines, or safety tips.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: getReply(input) }
    ]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-red-600 text-white text-2xl shadow-xl flex items-center justify-center hover:scale-110 transition"
      >
        🛡️
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[320px] max-w-[90vw] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between bg-red-600 text-white px-4 py-3">
            <span className="font-semibold">SAFE SIREN</span>
            <button onClick={() => setOpen(false)} className="text-lg">✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-xl text-sm whitespace-pre-line max-w-[80%] ${
                  m.sender === "user"
                    ? "ml-auto bg-red-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-2 border-t bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              onClick={sendMessage}
              className="bg-red-600 text-white px-4 py-2 rounded-full text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}