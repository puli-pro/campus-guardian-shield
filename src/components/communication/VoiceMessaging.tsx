
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Play, Pause, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceMessage {
  id: string;
  title: string;
  sender: string;
  date: Date;
  duration: string;
  isPlaying: boolean;
}

const VoiceMessaging = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: "1",
      title: "Security Protocol Update",
      sender: "Principal Johnson",
      date: new Date(Date.now() - 3600000),
      duration: "0:48",
      isPlaying: false
    },
    {
      id: "2",
      title: "Weekend Event Coordination",
      sender: "Dean Williams",
      date: new Date(Date.now() - 86400000),
      duration: "1:25",
      isPlaying: false
    },
    {
      id: "3",
      title: "New Visitor Guidelines",
      sender: "Security Chief Rivera",
      date: new Date(Date.now() - 172800000),
      duration: "2:10",
      isPlaying: false
    }
  ]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordingTime(0);
      toast({
        title: "Recording stopped",
        description: "Your voice message is ready to send.",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
      // Simulate recording timer
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Cleanup timer when recording stops
      return () => clearInterval(interval);
    }
  };

  const handleSend = () => {
    toast({
      title: "Message sent",
      description: "Your voice message has been sent to all security staff.",
    });
    setIsRecording(false);
    setRecordingTime(0);
    
    // Add new message to the list
    const newMessage = {
      id: Date.now().toString(),
      title: "New Voice Message",
      sender: "You",
      date: new Date(),
      duration: `0:${recordingTime < 10 ? '0' + recordingTime : recordingTime}`,
      isPlaying: false
    };
    
    setMessages([newMessage, ...messages]);
  };

  const togglePlayMessage = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id 
        ? {...msg, isPlaying: !msg.isPlaying} 
        : {...msg, isPlaying: false}
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" /> Voice Messaging
        </CardTitle>
        <CardDescription>
          Record and send voice messages to security personnel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center mb-4">
            {isRecording ? (
              <div className="animate-pulse flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                <Mic className="h-8 w-8 text-red-600" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100">
                <Mic className="h-8 w-8 text-slate-600" />
              </div>
            )}
          </div>
          
          {isRecording && (
            <div className="text-center mb-4">
              <p className="text-lg font-bold text-red-600">{formatTime(recordingTime)}</p>
              <p className="text-sm text-muted-foreground">Recording in progress...</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant={isRecording ? "destructive" : "default"}
              onClick={toggleRecording}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
            
            {isRecording && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsRecording(false);
                    setRecordingTime(0);
                  }}
                  aria-label="Cancel recording"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                
                <Button 
                  variant="default" 
                  onClick={handleSend}
                  aria-label="Send voice message"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Recent Voice Messages</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{message.title}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="truncate">{message.sender}</span>
                    <span className="mx-1">•</span>
                    <span>{message.date.toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-xs text-muted-foreground">{message.duration}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => togglePlayMessage(message.id)}
                    aria-label={message.isPlaying ? "Pause message" : "Play message"}
                  >
                    {message.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceMessaging;
