
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import TaxCalculator from "@/components/TaxCalculator";
import SipCalculator from "@/components/SipCalculator";

const Index = () => {
  const [activeTab, setActiveTab] = useState("tax");
  
  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />
      <Header />
      
      <main className="flex-1 container max-w-4xl py-10 px-4 md:py-16">
        <div className="space-y-8">
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple &amp; Elegant<br />Financial Calculators
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg text-balance">
              Calculate your tax liability and SIP investments with precision.
            </p>
          </div>
          
          <Tabs 
            defaultValue="tax" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-[400px] h-12">
                <TabsTrigger 
                  value="tax" 
                  className="text-base transition-all data-[state=active]:shadow-lg"
                >
                  Tax Calculator
                </TabsTrigger>
                <TabsTrigger 
                  value="sip" 
                  className="text-base transition-all data-[state=active]:shadow-lg"
                >
                  SIP Calculator
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent 
              value="tax" 
              className={`mt-0 transition-all ${activeTab === "tax" ? "animate-slide-right" : ""}`}
            >
              <TaxCalculator />
            </TabsContent>
            
            <TabsContent 
              value="sip" 
              className={`mt-0 transition-all ${activeTab === "sip" ? "animate-slide-left" : ""}`}
            >
              <SipCalculator />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
