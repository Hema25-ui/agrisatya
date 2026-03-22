import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bot, MessageSquareText, MoreVertical, Send } from "lucide-react";
import { useRef, useState } from "react";

const RESPONSES: Record<string, string> = {
  wheat:
    "For wheat rust management: Apply fungicides like Propiconazole or Tebuconazole at early infection stages. Remove infected crop residues. Use resistant varieties like HD-2967. Ensure proper field drainage to reduce humidity.",
  rice: "Rice blight (Xanthomonas oryzae) can be managed by: Seed treatment with Streptomycin sulfate, removing infected plants, maintaining optimum water level, and applying copper-based bactericides.",
  soil: "For healthy soil: Test pH (ideal 6.0-7.0 for most crops), add organic compost (5-10 tons/acre), use green manure crops like Dhaincha, and avoid over-irrigation to prevent waterlogging.",
  irrigation:
    "Optimal irrigation schedule: Wheat needs 4-6 irrigations (sowing, tillering, jointing, flowering, grain-fill, dough stages). Use drip irrigation to save 30-40% water. Monitor soil moisture at 6-inch depth.",
  fertilizer:
    "Balanced fertilizer use: NPK ratio 120:60:40 kg/ha for wheat. Apply Urea in 3 splits (basal, tillering, jointing). Use DAP at sowing. Add Zinc Sulphate (25 kg/ha) for deficient soils.",
  maize:
    "Maize crop care: Plant spacing 60x25cm, apply 150:75:50 NPK kg/ha, first irrigation at 20-25 days, use hybrid seeds for better yield. Watch for fall armyworm - apply Chlorpyrifos if detected.",
  default:
    "For general crop health: Monitor fields regularly using NDVI index, maintain optimal soil moisture, use IPM strategies to reduce pesticide dependency, and keep records of crop history for better planning.",
};

function getResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const key of Object.keys(RESPONSES)) {
    if (lower.includes(key)) return RESPONSES[key];
  }
  return RESPONSES.default;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

let msgCounter = 0;
const INITIAL: Message[] = [
  { id: ++msgCounter, role: "user", text: "How to manage wheat rust?" },
  { id: ++msgCounter, role: "assistant", text: RESPONSES.wheat },
];

export default function ChatCard() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: ++msgCounter, role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    scrollToBottom();
    setTimeout(() => {
      const reply: Message = {
        id: ++msgCounter,
        role: "assistant",
        text: getResponse(userMsg.text),
      };
      setMessages((prev) => [...prev, reply]);
      setThinking(false);
      scrollToBottom();
    }, 1200);
  };

  return (
    <Card
      className="shadow-card border-border flex flex-col"
      data-ocid="chat.card"
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-100 flex items-center justify-center">
            <MessageSquareText size={15} className="text-blue-600" />
          </div>
          <CardTitle className="text-sm font-semibold">
            Farming Assistant
          </CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1 rounded hover:bg-accent"
              data-ocid="chat.dropdown_menu"
            >
              <MoreVertical size={14} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Clear Chat</DropdownMenuItem>
            <DropdownMenuItem>Export Chat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2 min-h-0">
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-48">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 items-start ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar className="w-6 h-6 flex-shrink-0 mt-0.5">
                <AvatarFallback
                  className={`text-[9px] font-bold ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {msg.role === "user" ? "AK" : <Bot size={12} />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`text-xs px-2.5 py-1.5 rounded-lg max-w-[85%] leading-relaxed ${
                  msg.role === "user"
                    ? "chat-bubble-user"
                    : "chat-bubble-assistant"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex gap-2 items-center">
              <Avatar className="w-6 h-6 flex-shrink-0">
                <AvatarFallback className="bg-muted text-muted-foreground">
                  <Bot size={12} />
                </AvatarFallback>
              </Avatar>
              <div
                className="chat-bubble-assistant text-xs px-2.5 py-1.5 rounded-lg"
                data-ocid="chat.loading_state"
              >
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about crops, soil, irrigation..."
            className="text-xs h-8"
            data-ocid="chat.input"
          />
          <Button
            size="sm"
            className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 flex-shrink-0"
            onClick={sendMessage}
            disabled={thinking}
            data-ocid="chat.submit_button"
          >
            <Send size={13} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
