
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Accessibility } from "lucide-react";

type FontSize = "base" | "large" | "x-large" | "xx-large";
type Theme = "light" | "dark" | "high-contrast";
type Language = "english" | "hindi" | "spanish";

const languageOptions = [
  { value: "english", label: "English" },
  { value: "hindi", label: "हिन्दी (Hindi)" },
  { value: "spanish", label: "Español (Spanish)" },
];

export default function AccessibilityPanel() {
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("english");
  const { toast } = useToast();
  
  // Effect to apply font size
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("text-base-size", "text-large", "text-x-large", "text-xx-large");
    
    switch (fontSize) {
      case "base":
        root.classList.add("text-base-size");
        break;
      case "large":
        root.classList.add("text-large");
        break;
      case "x-large":
        root.classList.add("text-x-large");
        break;
      case "xx-large":
        root.classList.add("text-xx-large");
        break;
    }
  }, [fontSize]);
  
  // Effect to apply theme
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove("light", "dark", "high-contrast");
    
    // Add selected theme class
    root.classList.add(theme);
  }, [theme]);
  
  // Handle font size change
  const changeFontSize = (size: FontSize) => {
    setFontSize(size);
  };
  
  // Handle theme change
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };
  
  // Handle language change
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast({
      title: "Language Changed",
      description: `Language changed to ${newLanguage}`,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full z-50 shadow-lg focus:ring-2"
          aria-label="Accessibility options"
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Text Size</h3>
            <div className="flex gap-2">
              <Button 
                variant={fontSize === "base" ? "default" : "outline"} 
                size="sm"
                onClick={() => changeFontSize("base")}
                className="flex-1"
              >
                A
              </Button>
              <Button 
                variant={fontSize === "large" ? "default" : "outline"} 
                size="sm"
                onClick={() => changeFontSize("large")}
                className="flex-1"
              >
                A+
              </Button>
              <Button 
                variant={fontSize === "x-large" ? "default" : "outline"} 
                size="sm"
                onClick={() => changeFontSize("x-large")}
                className="flex-1"
              >
                A++
              </Button>
              <Button 
                variant={fontSize === "xx-large" ? "default" : "outline"} 
                size="sm"
                onClick={() => changeFontSize("xx-large")}
                className="flex-1"
              >
                A+++
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Display Mode</h3>
            <div className="flex gap-2">
              <Button 
                variant={theme === "light" ? "default" : "outline"} 
                size="sm"
                onClick={() => changeTheme("light")}
                className="flex-1"
              >
                Light
              </Button>
              <Button 
                variant={theme === "dark" ? "default" : "outline"} 
                size="sm"
                onClick={() => changeTheme("dark")}
                className="flex-1"
              >
                Dark
              </Button>
              <Button 
                variant={theme === "high-contrast" ? "default" : "outline"} 
                size="sm"
                onClick={() => changeTheme("high-contrast")}
                className="flex-1"
              >
                High Contrast
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Language</h3>
            <div className="grid grid-cols-1 gap-2">
              {languageOptions.map((option) => (
                <Button 
                  key={option.value}
                  variant={language === option.value ? "default" : "outline"} 
                  size="sm"
                  onClick={() => changeLanguage(option.value as Language)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto"
              onClick={() => {
                toast({
                  title: "Accessibility Statement",
                  description: "Opening accessibility statement...",
                });
              }}
            >
              View Accessibility Statement
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
