import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Bug, Droplets, Leaf, Send, Sun } from "lucide-react";
import { useRef, useState } from "react";

const RESPONSES: Record<string, string> = {
  wheat:
    "For wheat rust management: Apply fungicides like Propiconazole 25EC @ 0.1% solution. Remove infected crop residues and use resistant varieties like HD-2967 or PBW-550. Ensure proper field drainage to reduce humidity. Scout regularly — early detection saves 40-60% yield loss.",
  rice: "Rice blast (Magnaporthe oryzae) management: Seed treatment with Tricyclazole 75WP, drain fields periodically, avoid excess nitrogen application. For bacterial blight, use Streptomycin sulfate + Copper sulphate mixture. Resistant varieties: IR-64, Pusa Basmati 1.",
  soil: "Healthy soil management: Test pH (ideal 6.0-7.0), add FYM (Farm Yard Manure) @ 10-15 tons/ha, use green manures (Dhaincha, Sunhemp). Avoid waterlogging — install sub-surface drainage. For alkaline soils, apply Gypsum @ 2-5 tons/ha to reduce pH.",
  irrigation:
    "Optimal irrigation for major crops: Wheat needs 4-6 irrigations at CRI, tillering, jointing, flowering, grain-fill, dough stages. Rice needs 2-5 cm standing water during vegetative stage. Use tensiometer for moisture monitoring. Drip irrigation saves 30-40% water.",
  fertilizer:
    "Balanced fertilization for wheat: NPK @ 120:60:40 kg/ha. Split urea — 1/3 basal + 1/3 at first irrigation + 1/3 at second irrigation. Use DAP (18:46:0) at sowing. Add Zinc Sulphate @ 25 kg/ha for Zn-deficient soils.",
  maize:
    "Maize cultivation: Plant spacing 60x20 cm, depth 3-4 cm. Apply NPK @ 150:75:50 kg/ha. First irrigation at 20-25 DAS. Watch for Fall Armyworm (Spodoptera frugiperda) — spray Chlorpyrifos 20EC @ 2.5 ml/L or Emamectin benzoate. Hybrid varieties: DKC-9144, P-3396.",
  pest: "Integrated Pest Management (IPM): Use pheromone traps for monitoring (1 per acre). Yellow sticky traps for whiteflies. Neem-based insecticides (Azadirachtin 0.03%) as first line. Chemical: Imidacloprid 17.8SL @ 0.3 ml/L for sucking pests. Rotate insecticide groups to prevent resistance.",
  default:
    "I can help with wheat, rice, maize, soil management, irrigation scheduling, fertilizer recommendations, and pest control. Please ask about a specific crop or farming challenge for detailed guidance.",
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
  time: string;
}

const timeStr = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

let msgId = 0;
const INITIAL: Message[] = [
  {
    id: ++msgId,
    role: "user",
    text: "How to manage wheat rust?",
    time: "09:30 AM",
  },
  { id: ++msgId, role: "assistant", text: RESPONSES.wheat, time: "09:30 AM" },
  {
    id: ++msgId,
    role: "user",
    text: "What is the best irrigation schedule for rice?",
    time: "09:32 AM",
  },
  {
    id: ++msgId,
    role: "assistant",
    text: RESPONSES.irrigation,
    time: "09:32 AM",
  },
];

const QUICK_QUERIES = [
  {
    label: "Soil Health",
    icon: <Leaf size={12} />,
    query: "How to improve soil health?",
  },
  {
    label: "Irrigation Tips",
    icon: <Droplets size={12} />,
    query: "Best irrigation schedule",
  },
  {
    label: "Pest Control",
    icon: <Bug size={12} />,
    query: "How to manage pest infestation?",
  },
  {
    label: "Fertilizer Guide",
    icon: <Sun size={12} />,
    query: "Recommend fertilizer for wheat",
  },
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const sendMessage = (text?: string) => {
    const msg = text ?? input;
    if (!msg.trim()) return;
    const userMsg: Message = {
      id: ++msgId,
      role: "user",
      text: msg,
      time: timeStr(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    scrollToBottom();
    setTimeout(() => {
      const reply: Message = {
        id: ++msgId,
        role: "assistant",
        text: getResponse(userMsg.text),
        time: timeStr(),
      };
      setMessages((prev) => [...prev, reply]);
      setThinking(false);
      scrollToBottom();
    }, 1200);
  };

  return (
    <div className="space-y-4 h-full flex flex-col" data-ocid="chat.page">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Farming Assistant
          </h2>
          <p className="text-xs text-muted-foreground">
            AI-powered agricultural guidance & recommendations
          </p>
        </div>
        <Badge className="bg-success/10 text-success border-success/20 text-xs">
          ● Online
        </Badge>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        <Card className="flex-1 shadow-card border-border flex flex-col min-h-0">
          <CardContent className="flex-1 flex flex-col gap-0 p-4 min-h-0">
            <div
              className="flex-1 overflow-y-auto space-y-4 pr-1"
              style={{ maxHeight: "calc(100vh - 340px)" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="w-8 h-8 flex-shrink-0 mt-0.5">
                    <AvatarFallback
                      className={`text-xs font-bold ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.role === "user" ? "AK" : <Bot size={14} />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[75%] space-y-1 ${msg.role === "user" ? "items-end flex flex-col" : ""}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "chat-bubble-user rounded-tr-sm"
                          : "chat-bubble-assistant rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground px-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-muted">
                      <Bot size={14} />
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="chat-bubble-assistant px-3 py-2 rounded-xl rounded-tl-sm"
                    data-ocid="chat.loading_state"
                  >
                    <div className="flex gap-1 items-center">
                      <span
                        className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="flex gap-2 mt-4 flex-shrink-0">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about crops, soil, irrigation, pests..."
                className="flex-1"
                data-ocid="chat.input"
              />
              <Button
                className="bg-primary hover:bg-primary/90 px-4"
                onClick={() => sendMessage()}
                disabled={thinking}
                data-ocid="chat.submit_button"
              >
                <Send size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="w-48 flex-shrink-0 space-y-3">
          <Card className="shadow-card border-border">
            <CardContent className="p-3 space-y-2">
              <p className="text-xs font-semibold text-foreground">
                Quick Queries
              </p>
              {QUICK_QUERIES.map((q) => (
                <button
                  type="button"
                  key={q.label}
                  onClick={() => sendMessage(q.query)}
                  data-ocid="chat.quick.button"
                  className="w-full text-left flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors border border-border"
                >
                  <span className="text-primary">{q.icon}</span>
                  {q.label}
                </button>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-card border-border">
            <CardContent className="p-3 space-y-1">
              <p className="text-xs font-semibold text-foreground">About</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                AgriSatya AI uses crop science databases and satellite data to
                give you precision farming advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
