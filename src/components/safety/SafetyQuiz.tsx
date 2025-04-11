
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

const SafetyQuiz = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const questions: QuizQuestion[] = [
    {
      id: "q1",
      question: "What should you do if you encounter an unauthorized visitor on campus?",
      options: [
        { id: "q1o1", label: "Confront them directly and ask them to leave", isCorrect: false },
        { id: "q1o2", label: "Ignore them and continue with your activities", isCorrect: false },
        { id: "q1o3", label: "Report to campus security and provide a description", isCorrect: true },
        { id: "q1o4", label: "Call 911 immediately", isCorrect: false }
      ],
      explanation: "Always report unauthorized visitors to campus security rather than confronting them directly, which could lead to unsafe situations."
    },
    {
      id: "q2",
      question: "Which of the following are recommended for safe walking on campus at night? (Select all that apply)",
      options: [
        { id: "q2o1", label: "Walk in well-lit areas", isCorrect: true },
        { id: "q2o2", label: "Use the campus escort service", isCorrect: true },
        { id: "q2o3", label: "Take shortcuts through unlit areas to save time", isCorrect: false },
        { id: "q2o4", label: "Stay aware of your surroundings", isCorrect: true }
      ],
      explanation: "Walking in well-lit areas, using campus escort services, and staying aware of your surroundings are all important safety practices for night walking."
    },
    {
      id: "q3",
      question: "What is the correct response to an active threat situation on campus?",
      options: [
        { id: "q3o1", label: "Run if possible, hide if necessary, fight as a last resort", isCorrect: true },
        { id: "q3o2", label: "Always hide and wait for help", isCorrect: false },
        { id: "q3o3", label: "Gather personal belongings before evacuating", isCorrect: false },
        { id: "q3o4", label: "Use your phone to record the incident", isCorrect: false }
      ],
      explanation: "The recommended response to an active threat is to run (evacuate) if possible, hide if evacuation is not possible, and fight only as a last resort."
    }
  ];
  
  const handleOptionChange = (questionId: string, optionId: string) => {
    setSelectedOptions(prev => {
      const newSelected = { ...prev };
      newSelected[optionId] = !prev[optionId];
      return newSelected;
    });
  };
  
  const handleSubmit = () => {
    let newScore = 0;
    const currentQ = questions[currentQuestion];
    
    // Check if all correct options are selected and no incorrect options are selected
    let allCorrectSelected = true;
    let noIncorrectSelected = true;
    
    currentQ.options.forEach(option => {
      if (option.isCorrect && !selectedOptions[option.id]) {
        allCorrectSelected = false;
      }
      if (!option.isCorrect && selectedOptions[option.id]) {
        noIncorrectSelected = false;
      }
    });
    
    if (allCorrectSelected && noIncorrectSelected) {
      newScore = score + 1;
      setScore(newScore);
      toast({
        title: "Correct!",
        description: currentQ.explanation,
      });
    } else {
      toast({
        title: "Not quite right",
        description: currentQ.explanation,
        variant: "destructive"
      });
    }
    
    // Reset selections for next question
    setSelectedOptions({});
    
    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOptions({});
    setShowResults(false);
    setScore(0);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" /> Safety Awareness Quiz
        </CardTitle>
        <CardDescription>
          Test your knowledge of campus safety procedures
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showResults ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
                <span className="text-sm text-muted-foreground">Score: {score}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <div 
                  className="h-2 bg-blue-500 rounded-full" 
                  style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <div key={option.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={option.id} 
                    checked={selectedOptions[option.id] || false}
                    onCheckedChange={() => handleOptionChange(questions[currentQuestion].id, option.id)}
                  />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-muted-foreground mb-4">
              You scored {score} out of {questions.length} questions correctly.
            </p>
            
            {score < questions.length ? (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-700 dark:text-yellow-400">Areas to Review</h4>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Consider reviewing the safety guidelines for the questions you missed.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-700 dark:text-green-400">Perfect Score!</h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Excellent job! You have a strong understanding of campus safety procedures.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!showResults ? (
          <Button className="w-full" onClick={handleSubmit}>
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        ) : (
          <Button className="w-full" onClick={resetQuiz}>
            Restart Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SafetyQuiz;
