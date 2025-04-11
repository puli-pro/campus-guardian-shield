
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileUp, Send } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SubmitTipForm = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Safety tip submitted",
      description: "Your tip has been sent for review. Thank you for contributing!",
    });
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" /> Submit a Safety Tip
        </CardTitle>
        <CardDescription>
          Share your safety insights with the campus community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter a title for your safety tip" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campus">Campus Safety</SelectItem>
                <SelectItem value="digital">Digital Security</SelectItem>
                <SelectItem value="visitor">Visitor Awareness</SelectItem>
                <SelectItem value="emergency">Emergency Actions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Share your safety tip or suggestion in detail..." 
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="border rounded-lg p-4 bg-muted">
            <Label htmlFor="file-upload" className="block mb-2 text-sm">
              Support Materials (Optional)
            </Label>
            <Button 
              variant="outline" 
              className="w-full justify-start text-muted-foreground" 
              type="button"
              asChild
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileUp className="mr-2 h-4 w-4" /> Upload image or document
                <input id="file-upload" type="file" className="sr-only" />
              </label>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Accepted formats: JPG, PNG, PDF (max 5MB)
            </p>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>All submissions will be reviewed by campus safety administrators before publication.</p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          <Send className="mr-2 h-4 w-4" /> Submit Safety Tip
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubmitTipForm;
