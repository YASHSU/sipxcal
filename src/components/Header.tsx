
import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "py-2 bg-background/80 backdrop-blur-md border-b" : "py-4"
      }`}
    >
      <div className="container flex items-center justify-center">
        <div className="flex items-center gap-2 animate-fade-in">
          <Calculator className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">
            SIP<span className="text-primary">x</span>CAL
          </h1>
        </div>
      </div>
    </header>
  );
}
