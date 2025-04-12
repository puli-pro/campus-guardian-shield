
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, MessageSquare, MessageCircle, Filter, Send, Eye, EyeOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "../Constants";

interface Announcement {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  category: string;
  urgency: "low" | "medium" | "high";
  hasResponse: boolean;
}

interface Feedback {
  id: string;
  content: string;
  category: string;
  isAnonymous: boolean;
  timestamp: Date;
  response?: string;
}

const CampusAnnouncements = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState<string>("all");
  const [urgency, setUrgency] = useState<string>("all");
  const [anonymous, setAnonymous] = useState(false);

  const form = useForm({
    defaultValues: {
      message: "",
      category: "general",
      anonymous: false
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      content: "All security personnel are requested to attend the briefing tomorrow at 9 AM in the main auditorium.",
      sender: "Security Chief",
      timestamp: new Date(Date.now() - 3600000),
      category: "meeting",
      urgency: "medium",
      hasResponse: false
    },
    {
      id: "2",
      content: "New visitor guidelines have been posted. Please review and implement immediately.",
      sender: "Campus Administration",
      timestamp: new Date(Date.now() - 86400000),
      category: "policy",
      urgency: "high",
      hasResponse: true
    },
    {
      id: "3",
      content: "Maintenance scheduled for west gate cameras on Saturday. Please use alternative monitoring protocols.",
      sender: "Technical Support",
      timestamp: new Date(Date.now() - 172800000),
      category: "maintenance",
      urgency: "low",
      hasResponse: false
    }
  ]);
  const [feedbacksData, setFeedbacksData] = useState([])

  const [feedback, setFeedback] = useState<Feedback[]>([
    {
      id: "1",
      content: "The new check-in system is much faster. Great improvement!",
      category: "compliment",
      isAnonymous: false,
      timestamp: new Date(Date.now() - 86400000),
      response: "Thank you for your feedback! We're glad you're enjoying the new system."
    },
    {
      id: "2",
      content: "East gate has poor lighting in the evening. Safety concern for students.",
      category: "complaint",
      isAnonymous: true,
      timestamp: new Date(Date.now() - 172800000),
      response: "We've scheduled repairs for the lighting. Thank you for bringing this to our attention."
    }
  ]);

  const submitFeedback = async (data: any) => {
    const payload = {
      // id: Date.now().toString(),
      "feedback_text": data.message,
      "user_id": 1,
      "category": data.category,
      // isAnonymous: data.anonymous,
      // timestamp: new Date()
    };

    try {
      const response = await fetch(`${API_BASE_URL}/communication/feedbacks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to submit feedback:", errorData);
        throw new Error(errorData.detail || "Something went wrong");
      }

      const result = await response.json();

      form.reset();

      toast({
        title: "Feedback submitted",
        description: "Your feedback has been submitted successfully.",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit feedback.",
      });
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (category !== "all" && announcement.category !== category) return false;
    if (urgency !== "all" && announcement.urgency !== urgency) return false;
    return true;
  });

  console.log(feedbacksData)

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/communication/feedbacks/`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setFeedbacksData(data)
        } else {
          console.error("Error while getting", await response.text());
        }
      } catch (error) {
        console.error("Error getting data", error);
      }
    })()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" /> Campus Announcements
        </CardTitle>
        <CardDescription>
          Campus-wide communication and feedback system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="announcements">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="announcements">
              <MessageCircle className="h-4 w-4 mr-2" /> Announcements
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <MessageSquare className="h-4 w-4 mr-2" /> Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2 pb-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="policy">Policies</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>

              <Select value={urgency} onValueChange={setUrgency}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" aria-label="More filters">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-3 border rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{announcement.sender}</span>
                        <span className="text-xs text-muted-foreground">
                          {announcement.timestamp.toLocaleString()}
                        </span>
                      </div>

                      <div
                        className={`px-2 py-0.5 text-xs rounded-full ${announcement.urgency === 'high'
                          ? 'bg-red-100 text-red-800'
                          : announcement.urgency === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                          }`}
                      >
                        {announcement.urgency}
                      </div>
                    </div>

                    <p className="text-sm">{announcement.content}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {announcement.category}
                      </span>

                      {announcement.hasResponse ? (
                        <Button variant="ghost" size="sm">
                          View Response
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-3 w-3 mr-1" /> Reply
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No announcements match your current filters
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4 mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitFeedback)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Feedback</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your feedback, suggestion, or report an issue..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="suggestion">Suggestion</SelectItem>
                            <SelectItem value="complaint">Complaint</SelectItem>
                            <SelectItem value="compliment">Compliment</SelectItem>
                            <SelectItem value="question">Question</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="anonymous"
                    render={({ field }) => (
                      <FormItem className="flex items-end space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Submit anonymously</FormLabel>
                          <FormDescription className="text-xs">
                            Your identity will be hidden
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" /> Submit Feedback
                </Button>
              </form>
            </Form>

            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Recent Feedback & Responses</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {
                  feedbacksData.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {item.isAnonymous ? "Anonymous User" : "You"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                          {item.isAnonymous && <EyeOff className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </div>

                      <p className="text-sm">{item.feedback_text}</p>

                      {
                        item.replies?.map((reply) => (
                          <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg mt-2">
                            <p className="text-xs font-medium">{reply.user.first_name}:</p>
                            <p className="text-sm mt-1">{reply.reply_text}</p>
                          </div>
                        ))
                      }

                      {/* {item.response && (
                        <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg mt-2">
                          <p className="text-xs font-medium">Response from Admin:</p>
                          <p className="text-sm mt-1">{item.response}</p>
                        </div>
                      )} */}
                    </div>
                  ))
                }
                {/* {feedback.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {item.isAnonymous ? "Anonymous User" : "You"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.timestamp.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        {item.isAnonymous && <EyeOff className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    </div>

                    <p className="text-sm">{item.content}</p>

                    {item.response && (
                      <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg mt-2">
                        <p className="text-xs font-medium">Response from Admin:</p>
                        <p className="text-sm mt-1">{item.response}</p>
                      </div>
                    )}
                  </div>
                ))} */}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CampusAnnouncements;
