
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartPie } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import AnimatedNumber from "@/components/AnimatedNumber";
import { Slider } from "@/components/ui/slider";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [years, setYears] = useState(5);
  const [interestRate, setInterestRate] = useState(12);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [investedAmount, setInvestedAmount] = useState<number | null>(null);
  const [estimatedReturns, setEstimatedReturns] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);
  
  const calculateSIP = () => {
    if (!monthlyInvestment || isNaN(Number(monthlyInvestment))) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid monthly investment amount",
        variant: "destructive",
      });
      return;
    }
    
    setCalculating(true);
    // Simulate calculation delay for animation
    setTimeout(() => {
      const P = Number(monthlyInvestment);
      const r = interestRate / 100 / 12;
      const n = years * 12;
      
      const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const totalInvestment = P * n;
      
      setInvestedAmount(Math.round(totalInvestment));
      setTotalAmount(Math.round(futureValue));
      setEstimatedReturns(Math.round(futureValue - totalInvestment));
      setAnimateResult(true);
      setCalculating(false);
      
      toast({
        title: "SIP calculated",
        description: "Your estimated SIP returns have been calculated",
      });
    }, 800);
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl glass-morphism card-gradient">
      <div className="flex items-center gap-2 mb-6">
        <ChartPie className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-medium">SIP Calculator</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="monthlyInvestment">Monthly Investment (₹)</Label>
          <Input
            id="monthlyInvestment"
            type="number"
            placeholder="Enter monthly investment amount"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            className="transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="years">Investment Period</Label>
            <span className="text-sm font-medium">{years} Years</span>
          </div>
          <Slider
            id="years"
            min={1}
            max={30}
            step={1}
            value={[years]}
            onValueChange={(value) => setYears(value[0])}
            className="py-2"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="interestRate">Expected Return Rate</Label>
            <span className="text-sm font-medium">{interestRate}%</span>
          </div>
          <Slider
            id="interestRate"
            min={1}
            max={30}
            step={0.5}
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            className="py-2"
          />
        </div>
        
        <Button 
          onClick={calculateSIP} 
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
            "Calculate SIP"
          )}
        </Button>
        
        {totalAmount !== null && (
          <div className={`p-4 border rounded-lg bg-background/50 transition-all ${animateResult ? 'animate-scale-in' : ''}`}>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invested Amount:</p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-foreground">₹</span>
                  <AnimatedNumber 
                    value={investedAmount || 0} 
                    className="text-lg font-bold ml-1" 
                  />
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estimated Returns:</p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-primary">₹</span>
                  <AnimatedNumber 
                    value={estimatedReturns || 0} 
                    className="text-lg font-bold text-primary ml-1" 
                  />
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value:</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-foreground">₹</span>
                  <AnimatedNumber 
                    value={totalAmount || 0} 
                    className="text-2xl font-bold ml-1" 
                    onComplete={() => setAnimateResult(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
