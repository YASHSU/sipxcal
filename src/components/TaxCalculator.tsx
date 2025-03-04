
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import AnimatedNumber from "@/components/AnimatedNumber";

export default function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [taxAmount, setTaxAmount] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);
  
  const calculateTax = () => {
    if (!income || isNaN(Number(income))) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid income amount",
        variant: "destructive",
      });
      return;
    }
    
    setCalculating(true);
    // Simulate calculation delay for animation
    setTimeout(() => {
      const numIncome = Number(income);
      let tax = 0;
      
      // Simple tax calculation
      if (numIncome <= 250000) {
        tax = 0;
      } else if (numIncome <= 500000) {
        tax = (numIncome - 250000) * 0.05;
      } else if (numIncome <= 750000) {
        tax = 12500 + (numIncome - 500000) * 0.1;
      } else if (numIncome <= 1000000) {
        tax = 37500 + (numIncome - 750000) * 0.15;
      } else if (numIncome <= 1250000) {
        tax = 75000 + (numIncome - 1000000) * 0.2;
      } else if (numIncome <= 1500000) {
        tax = 125000 + (numIncome - 1250000) * 0.25;
      } else {
        tax = 187500 + (numIncome - 1500000) * 0.3;
      }
      
      setTaxAmount(Math.round(tax));
      setAnimateResult(true);
      setCalculating(false);
      
      toast({
        title: "Tax calculated",
        description: "Your estimated tax amount has been calculated",
      });
    }, 800);
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl glass-morphism card-gradient">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-medium">Income Tax Calculator</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="income">Annual Income (₹)</Label>
          <Input
            id="income"
            type="number"
            placeholder="Enter your annual income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
          />
        </div>
        
        <Button 
          onClick={calculateTax} 
          className="w-full transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          disabled={calculating}
        >
          {calculating ? (
            <span className="inline-flex items-center gap-1">
              <span className="animate-pulse">Calculating</span>
              <span className="animate-pulse delay-100">.</span>
              <span className="animate-pulse delay-200">.</span>
              <span className="animate-pulse delay-300">.</span>
            </span>
          ) : (
            "Calculate Tax"
          )}
        </Button>
        
        {taxAmount !== null && (
          <div className={`p-4 border rounded-lg bg-background/50 transition-all ${animateResult ? 'animate-scale-in' : ''}`}>
            <p className="text-sm font-medium text-muted-foreground">Estimated Tax Amount:</p>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold text-foreground">₹</span>
              <AnimatedNumber 
                value={taxAmount} 
                className="text-2xl font-bold ml-1" 
                onComplete={() => setAnimateResult(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
