
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Play, Pause, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "../Constants";
import { Input } from "../ui/input";

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
  const [voiceMsgsData, setVoiceMsgsData] = useState([])
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const [voiceTitle, setVoiceTitle] = useState("")
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

  // const handleSend = () => {
  //   toast({
  //     title: "Message sent",
  //     description: "Your voice message has been sent to all security staff.",
  //   });
  //   setIsRecording(false);
  //   setRecordingTime(0);

  //   // Add new message to the list
  //   const newMessage = {
  //     id: Date.now().toString(),
  //     title: "New Voice Message",
  //     sender: "You",
  //     date: new Date(),
  //     duration: `0:${recordingTime < 10 ? '0' + recordingTime : recordingTime}`,
  //     isPlaying: false
  //   };

  //   setMessages([newMessage, ...messages]);
  // };

  const togglePlayMessage = (id: string) => {
    setMessages(messages.map(msg =>
      msg.id === id
        ? { ...msg, isPlaying: !msg.isPlaying }
        : { ...msg, isPlaying: false }
    ));
  };


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const startRecording = async () => {
    if (voiceTitle) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = handleStop;
      mediaRecorderRef.current.start();

      setIsRecording(true);
      startTimer();
    }
    else {
      toast({
        title: "Requirements not met",
        description: "Please fill voice title.",
      });
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    stopTimer();
    setVoiceTitle('')
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const handleStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("audio_file", audioBlob, "recording.webm");
    formData.append("transcription", "");
    //change the user id with the correct one
    formData.append("user", '1');
    formData.append("title", voiceTitle);

    try {
      const response = await fetch(`${API_BASE_URL}/communication/upload/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setVoiceTitle('')
        console.log("Upload successful", data);
      } else {
        console.error("Upload failed", await response.text());
      }
    } catch (error) {
      console.error("Error uploading", error);
    }
  };

  const handleSend = () => {
    stopRecording();
    setRecordingTime(0)
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    stopTimer();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/communication/list/`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setVoiceMsgsData(data)
        } else {
          console.error("Error while getting", await response.text());
        }
      } catch (error) {
        console.error("Error getting data", error);
      }
    })()
  }, [])

  console.log(voiceMsgsData)

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
        <Input
          placeholder="Search by bus number, destination, or driver..."
          className="pl-8"
          value={voiceTitle}
          onChange={(e) => setVoiceTitle(e.target.value)}
        />
        <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center mb-4">
            {isRecording ? (
              <div
                className="animate-pulse flex items-center justify-center h-16 w-16 rounded-full bg-red-100"
                onClick={stopRecording}
              >
                <Mic className="h-8 w-8 text-red-600" />
              </div>
            ) : (
              <div
                className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100"
                onClick={startRecording}
              >
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
              onClick={isRecording ? stopRecording : startRecording}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>

            {isRecording && (
              <>
                <Button
                  variant="outline"
                  onClick={cancelRecording}
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
