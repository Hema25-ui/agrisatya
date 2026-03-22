import type { Page } from "@/App";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Leaf,
  MessageSquareText,
  PawPrint,
  Satellite,
  ScanLine,
  Search,
  Settings,
} from "lucide-react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "land-health", label: "Land Health", icon: <Satellite size={18} /> },
  { id: "crop-scanner", label: "Crop Scanner", icon: <ScanLine size={18} /> },
  {
    id: "chat",
    label: "Chat Assistant",
    icon: <MessageSquareText size={18} />,
  },
  {
    id: "animal-tracking",
    label: "Animal Tracking",
    icon: <PawPrint size={18} />,
  },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function Layout({
  children,
  currentPage,
  onNavigate,
}: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="sidebar-gradient w-64 flex-shrink-0 flex flex-col h-full shadow-lg">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Leaf size={18} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">
                AgriSatya
              </span>
              <p className="text-white/60 text-[10px] leading-none mt-0.5">
                Smart Farming Platform
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1" data-ocid="sidebar.panel">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onNavigate(item.id)}
              data-ocid={`nav.${item.id}.link`}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.id
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-white/20 text-white text-xs font-bold">
                AK
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                Akash Kumar
              </p>
              <p className="text-white/60 text-xs truncate">AGR-2847</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-xs">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-base font-semibold text-foreground">
                Welcome, Akash! 👋
              </h1>
              <p className="text-xs text-muted-foreground">
                Farmer ID: AGR-2847
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  data-ocid="farm.select"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Leaf size={14} className="text-primary" />
                  Bihar Farm 1
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem data-ocid="farm.option.1">
                  Bihar Farm 1
                </DropdownMenuItem>
                <DropdownMenuItem data-ocid="farm.option.2">
                  Punjab Farm 2
                </DropdownMenuItem>
                <DropdownMenuItem data-ocid="farm.option.3">
                  UP Farm 3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative p-2 rounded-lg hover:bg-accent transition-colors"
              data-ocid="search.button"
            >
              <Search size={18} className="text-muted-foreground" />
            </button>
            <button
              type="button"
              className="relative p-2 rounded-lg hover:bg-accent transition-colors"
              data-ocid="notifications.button"
            >
              <Bell size={18} className="text-muted-foreground" />
              <Badge className="absolute -top-0.5 -right-0.5 w-4 h-4 p-0 text-[9px] flex items-center justify-center bg-destructive text-destructive-foreground border-0">
                3
              </Badge>
            </button>
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                AK
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-card border-t border-border px-6 py-2 flex-shrink-0">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} AgriSatya
            {" | "}
            <span className="hover:text-primary mx-1 cursor-pointer">
              Support
            </span>
            {" | "}
            <span className="hover:text-primary mx-1 cursor-pointer">
              Terms
            </span>
            {" | "}
            <span className="hover:text-primary mx-1 cursor-pointer">
              Privacy
            </span>
            {" | "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
