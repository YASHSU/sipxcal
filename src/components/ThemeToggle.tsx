
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
      className="fixed top-4 right-4 h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm border border-border transition-all hover:scale-110"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 animate-fade-in" />
      ) : (
        <Sun className="h-5 w-5 animate-fade-in" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
