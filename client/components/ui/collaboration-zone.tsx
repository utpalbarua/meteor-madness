import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Avatar, AvatarFallback } from "./avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
  MessageCircle,
  Send,
  Users,
  Star,
  Clock,
  Globe,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CollaborationZoneProps {
  className?: string;
}

interface Message {
  id: string;
  user: {
    name: string;
    role: string;
    organization: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  type: "message" | "decision" | "alert";
  priority?: "low" | "medium" | "high" | "critical";
  reactions?: Array<{
    type: "like" | "dislike" | "urgent";
    count: number;
  }>;
}

interface PublicFeedback {
  id: string;
  location: string;
  sentiment: "positive" | "negative" | "neutral";
  content: string;
  timestamp: Date;
  votes: number;
}

const messages: Message[] = [
  {
    id: "1",
    user: {
      name: "Dr. Sarah Chen",
      role: "Mission Director",
      organization: "NASA JPL",
    },
    content:
      "Nuclear deflection mission parameters have been finalized. Launch window opens in 72 hours. All teams confirm readiness status.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: "decision",
    priority: "critical",
    reactions: [
      { type: "like", count: 12 },
      { type: "urgent", count: 3 },
    ],
  },
  {
    id: "2",
    user: {
      name: "Commander Alex Rodriguez",
      role: "Operations Lead",
      organization: "Space Force",
    },
    content:
      "Tracking data confirms asteroid trajectory unchanged. Impact probability remains at 12.4%. Evacuation protocols remain on standby.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    type: "alert",
    priority: "high",
    reactions: [{ type: "like", count: 8 }],
  },
  {
    id: "3",
    user: {
      name: "Prof. Elena Volkov",
      role: "Planetary Defense",
      organization: "ESA",
    },
    content:
      "European shelter network construction ahead of schedule. 94% completion rate achieved. Coordination with evacuation routes optimized.",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    type: "message",
    priority: "medium",
    reactions: [{ type: "like", count: 15 }],
  },
  {
    id: "4",
    user: {
      name: "Dr. Kenji Tanaka",
      role: "Seismic Analysis",
      organization: "USGS",
    },
    content:
      "Updated impact models show reduced seismic activity if deflection succeeds by 15%. Sharing detailed geological assessments now.",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    type: "message",
    priority: "medium",
    reactions: [{ type: "like", count: 7 }],
  },
];

const publicFeedback: PublicFeedback[] = [
  {
    id: "1",
    location: "Los Angeles, CA",
    sentiment: "positive",
    content:
      "Grateful for the transparency and coordination. My family feels informed and prepared.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    votes: 234,
  },
  {
    id: "2",
    location: "London, UK",
    sentiment: "neutral",
    content:
      "Requesting more detailed evacuation routes for elderly and disabled residents in our district.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    votes: 89,
  },
  {
    id: "3",
    location: "Tokyo, Japan",
    sentiment: "negative",
    content:
      "Communication has been unclear. Need better coordination with local emergency services.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    votes: 156,
  },
];

export function CollaborationZone({ className }: CollaborationZoneProps) {
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("command");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "critical":
        return "border-l-danger bg-danger/5";
      case "high":
        return "border-l-warning bg-warning/5";
      case "medium":
        return "border-l-cosmic-nebula bg-cosmic-nebula/5";
      default:
        return "border-l-border bg-background";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-danger";
      default:
        return "text-muted-foreground";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="w-3 h-3" />;
      case "negative":
        return <ThumbsDown className="w-3 h-3" />;
      default:
        return <MessageCircle className="w-3 h-3" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cosmic-comet rounded-full animate-pulse"></div>
            Collaboration Zone
            <Badge variant="outline" className="ml-auto">
              <Users className="w-3 h-3 mr-1" />
              47 active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="command">Command Center</TabsTrigger>
              <TabsTrigger value="public">Public Feedback</TabsTrigger>
              <TabsTrigger value="analysis">Expert Analysis</TabsTrigger>
            </TabsList>

            {/* Command Center Chat */}
            <TabsContent value="command" className="space-y-4 mt-6">
              <div className="bg-cosmic-void/20 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "p-4 rounded-lg border-l-4",
                      getPriorityColor(message.priority),
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-cosmic-nebula/20">
                          {message.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {message.user.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {message.user.organization}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {message.user.role}
                          </span>
                          {message.priority === "critical" && (
                            <AlertTriangle className="w-3 h-3 text-danger" />
                          )}
                        </div>

                        <p className="text-sm mb-2">{message.content}</p>

                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(message.timestamp)}
                          </span>

                          {message.reactions && (
                            <div className="flex items-center gap-2">
                              {message.reactions.map((reaction, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                >
                                  {reaction.type === "like" && (
                                    <ThumbsUp className="w-3 h-3 mr-1" />
                                  )}
                                  {reaction.type === "urgent" && (
                                    <Star className="w-3 h-3 mr-1" />
                                  )}
                                  {reaction.count}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Share updates, decisions, or coordinate with the team..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-6 cosmic-glow"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Public Feedback */}
            <TabsContent value="public" className="space-y-4 mt-6">
              <div className="bg-cosmic-void/20 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
                {publicFeedback.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="p-4 bg-card/50 rounded-lg border border-border/30"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-cosmic-nebula" />
                        <span className="font-medium text-sm">
                          {feedback.location}
                        </span>
                        <div
                          className={cn(
                            "flex items-center gap-1",
                            getSentimentColor(feedback.sentiment),
                          )}
                        >
                          {getSentimentIcon(feedback.sentiment)}
                          <span className="text-xs capitalize">
                            {feedback.sentiment}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ThumbsUp className="w-3 h-3" />
                        {feedback.votes}
                      </div>
                    </div>

                    <p className="text-sm mb-2">{feedback.content}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(feedback.timestamp)}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Helpful
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Respond
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-cosmic-void/20 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-success">67%</div>
                  <div className="text-xs text-muted-foreground">
                    Positive Sentiment
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-cosmic-nebula">
                    2,847
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Responses
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-cosmic-comet">156</div>
                  <div className="text-xs text-muted-foreground">Locations</div>
                </div>
              </div>
            </TabsContent>

            {/* Expert Analysis */}
            <TabsContent value="analysis" className="space-y-4 mt-6">
              <div className="bg-cosmic-void/20 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
                <div className="p-4 bg-card/50 rounded-lg border border-cosmic-plasma/20">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-4 h-4 text-cosmic-plasma" />
                    <span className="font-medium">
                      Dr. Maria Santos - Atmospheric Physics
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Verified Expert
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">
                    Updated atmospheric entry models suggest 15% reduction in
                    energy dissipation if deflection occurs within the next 96
                    hours. Recommend prioritizing nuclear pulse option.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    2 hours ago • 23 endorsements
                  </div>
                </div>

                <div className="p-4 bg-card/50 rounded-lg border border-cosmic-asteroid/20">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-4 h-4 text-cosmic-asteroid" />
                    <span className="font-medium">
                      Prof. Zhang Wei - Structural Engineering
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Verified Expert
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">
                    Shelter construction analysis: current pace will achieve 89%
                    population coverage. Recommend resource reallocation to
                    high-density urban areas for maximum efficiency.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    4 hours ago • 31 endorsements
                  </div>
                </div>

                <div className="p-4 bg-card/50 rounded-lg border border-cosmic-comet/20">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-4 h-4 text-cosmic-comet" />
                    <span className="font-medium">
                      Dr. James Mitchell - Crisis Management
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Verified Expert
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">
                    Evacuation logistics update: transportation capacity at 78%.
                    Coordinating with military assets to increase coverage.
                    Recommend phased evacuation starting with highest risk
                    zones.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    1 hour ago • 18 endorsements
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
