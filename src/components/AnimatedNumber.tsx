
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  duration?: number;
  onComplete?: () => void;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className = "",
  duration = 1000,
  onComplete,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentValue = Math.floor(startValue + (value - startValue) * easedProgress);
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        if (onComplete) onComplete();
      }
    };
    
    window.requestAnimationFrame(step);
    
    return () => {
      startTime = null;
    };
  }, [value, duration, onComplete]);
  
  // Format number with commas
  const formattedValue = displayValue.toLocaleString('en-IN');
  
  return (
    <span className={`inline-block transition-all ${className}`}>
      {formattedValue}
    </span>
  );
};

export default AnimatedNumber;
