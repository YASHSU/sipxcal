
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="fixed top-4 right-4 h-12 w-12 rounded-full bg-background/60 backdrop-blur-md border border-border transition-all duration-300 hover:scale-110 hover:shadow-lg z-50"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
          theme === 'light' ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'
        }`} />
        <Moon className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
          theme === 'light' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'
        }`} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
