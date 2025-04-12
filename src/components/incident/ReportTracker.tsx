
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Loader2, 
  FileX, 
  FileCheck,
  MessageSquare,
  Search,
  AlertCircle,
  Send
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ReportStatus = "submitted" | "reviewing" | "resolved" | "closed";

interface IncidentReport {
  id: string;
  type: string;
  description: string;
  location?: string;
  timestamp: Date;
  status: ReportStatus;
  isAnonymous: boolean;
  response?: string;
  lastUpdated: Date;
  comments?: string[];
  evidence?: string | null;
}

const getStatusIcon = (status: ReportStatus) => {
  switch (status) {
    case "submitted":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "reviewing":
      return <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />;
    case "resolved":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "closed":
      return <FileCheck className="h-4 w-4 text-slate-500" />;
  }
};

const getStatusBadge = (status: ReportStatus) => {
  switch (status) {
    case "submitted":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Submitted</Badge>;
    case "reviewing":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Under Review</Badge>;
    case "resolved":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
    case "closed":
      return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">Closed</Badge>;
  }
};

const ReportTracker = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  const [myReports, setMyReports] = useState<IncidentReport[]>([
    {
      id: "R-1234",
      type: "suspicious",
      description: "Individual taking photos of building access points near the science building.",
      location: "Science Building, West Entrance",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: "resolved",
      isAnonymous: false,
      response: "Security personnel investigated the area and identified the individual as a photography student working on a project. The student has been advised about campus policies.",
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      comments: ["Thank you for the quick response.", "I've seen the same person again today, but they had a faculty member with them."]
    },
    {
      id: "R-1235",
      type: "safety",
      description: "Broken glass on walkway between dormitories and main campus.",
      location: "Main Campus Path",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: "closed",
      isAnonymous: false,
      response: "Maintenance team dispatched and removed the hazard. Area has been cleaned and checked for other safety issues.",
      lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      comments: []
    },
    {
      id: "R-1236",
      type: "theft",
      description: "Laptop stolen from library study area while briefly unattended.",
      location: "Main Library, 2nd Floor",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: "reviewing",
      isAnonymous: false,
      lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      comments: ["The laptop has a distinctive sticker on it with a blue dragon design."]
    },
    {
      id: "R-1237",
      type: "harassment",
      description: "Received threatening messages regarding upcoming student election.",
      location: "Online/Student Portal",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      status: "submitted",
      isAnonymous: true,
      lastUpdated: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      comments: []
    }
  ]);
  
  // Listen for new reports from the SubmitReportForm component
  useEffect(() => {
    const handleReportSubmitted = (event: CustomEvent) => {
      const newReport = event.detail.report;
      setMyReports(prevReports => [newReport, ...prevReports]);
      
      toast({
        title: "Report Added",
        description: `Report ${newReport.id} has been added to your tracker`,
      });
    };
    
    document.addEventListener('reportSubmitted', handleReportSubmitted as EventListener);
    
    return () => {
      document.removeEventListener('reportSubmitted', handleReportSubmitted as EventListener);
    };
  }, [toast]);
  
  const filteredReports = myReports.filter(report => 
    report.type.includes(searchTerm.toLowerCase()) || 
    report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const viewReportDetails = (report: IncidentReport) => {
    setSelectedReport(report);
    setShowCommentBox(false);
  };

  const addComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Comment cannot be empty",
        description: "Please enter a comment before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (selectedReport) {
      const updatedReports = myReports.map(report => {
        if (report.id === selectedReport.id) {
          const comments = report.comments || [];
          return {
            ...report,
            comments: [...comments, newComment],
            lastUpdated: new Date()
          };
        }
        return report;
      });

      setMyReports(updatedReports);
      
      // Update the selected report as well
      const updatedReport = updatedReports.find(r => r.id === selectedReport.id);
      if (updatedReport) {
        setSelectedReport(updatedReport);
      }

      setNewComment("");
      setShowCommentBox(false);

      toast({
        title: "Comment added",
        description: "Your comment has been added to the report."
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" /> Track Your Reports
        </CardTitle>
        <CardDescription>
          Monitor the status of your submitted incident reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedReport ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium flex items-center gap-2">
                Report Details
                <span className="text-sm text-muted-foreground">#{selectedReport.id}</span>
              </h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedReport(null)}
              >
                Back to List
              </Button>
            </div>
            
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium capitalize">{selectedReport.type.replace('-', ' ')} Incident</h4>
                  <p className="text-sm text-muted-foreground">
                    Reported on {selectedReport.timestamp.toLocaleDateString()} at {selectedReport.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {getStatusBadge(selectedReport.status)}
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm mt-1">{selectedReport.description}</p>
              </div>
              
              {selectedReport.location && (
                <div>
                  <h4 className="text-sm font-medium">Location</h4>
                  <p className="text-sm mt-1">{selectedReport.location}</p>
                </div>
              )}
              
              {selectedReport.evidence && (
                <div>
                  <h4 className="text-sm font-medium">Evidence</h4>
                  <div className="mt-2 rounded-md overflow-hidden border">
                    <img 
                      src={selectedReport.evidence} 
                      alt="Incident evidence" 
                      className="max-h-48 object-contain" 
                    />
                  </div>
                </div>
              )}
              
              {selectedReport.response && (
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md mt-4">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Response from Security Team
                  </h4>
                  <p className="text-sm mt-2">{selectedReport.response}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Last updated: {selectedReport.lastUpdated.toLocaleDateString()} at {selectedReport.lastUpdated.toLocaleTimeString()}
                  </p>
                </div>
              )}
              
              {(selectedReport.status === "submitted" || selectedReport.status === "reviewing") && (
                <div className="border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 p-3 rounded-md flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400">Report Under Review</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      Your report is being reviewed by our security team. You will receive an update when there is progress.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Comments Section */}
              {selectedReport.comments && selectedReport.comments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Your Comments</h4>
                  <div className="space-y-2">
                    {selectedReport.comments.map((comment, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                        <p className="text-sm">{comment}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {index === selectedReport.comments!.length - 1 
                            ? `Posted on ${selectedReport.lastUpdated.toLocaleDateString()}`
                            : `Posted earlier`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Comment Form */}
              {showCommentBox ? (
                <div className="pt-2 space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Add Comment
                  </h4>
                  <Textarea
                    placeholder="Enter your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setShowCommentBox(false);
                        setNewComment("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={addComment}
                      className="gap-1"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Submit Comment
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => setShowCommentBox(true)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Add Comment
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search reports..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {filteredReports.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell className="capitalize">{report.type.replace('-', ' ')}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(report.status)}
                            <span>{report.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{report.timestamp.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => viewReportDetails(report)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No reports matching your search" : "You haven't submitted any reports yet"}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportTracker;
