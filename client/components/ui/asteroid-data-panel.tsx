import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Satellite, Zap, Ruler, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AsteroidDataPanelProps {
  className?: string;
}

// Mock NASA data for Impactor-2025
const trajectoryData = [
  { date: "2024-01", distance: 45000000, velocity: 15.2, probability: 8.1 },
  { date: "2024-02", distance: 38000000, velocity: 16.8, probability: 9.3 },
  { date: "2024-03", distance: 32000000, velocity: 18.5, probability: 10.7 },
  { date: "2024-04", distance: 26000000, velocity: 20.3, probability: 12.4 },
  { date: "2024-05", distance: 21000000, velocity: 22.1, probability: 15.2 },
];

const sizeData = [
  { component: "Core Mass", value: 89, unit: "%" },
  { component: "Rocky Material", value: 73, unit: "%" },
  { component: "Ice Content", value: 12, unit: "%" },
  { component: "Metal Density", value: 45, unit: "%" },
];

const asteroidInfo = {
  designation: "Impactor-2025",
  diameter: "1.2 km",
  mass: "2.8 × 10¹⁵ kg",
  classification: "Near-Earth Asteroid (NEA)",
  discoveryDate: "2023-11-15",
  impactProbability: "12.4%",
  currentDistance: "26.1 million km",
  velocity: "20.3 km/s",
  estimatedImpact: "2025-04-13 14:23 UTC",
};

export function AsteroidDataPanel({ className }: AsteroidDataPanelProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border-cosmic-nebula/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cosmic-nebula/20 rounded-lg">
                <Satellite className="w-5 h-5 text-cosmic-nebula" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Current Distance
                </p>
                <p className="text-xl font-bold text-cosmic-nebula">
                  {asteroidInfo.currentDistance}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-cosmic-comet/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cosmic-comet/20 rounded-lg">
                <Zap className="w-5 h-5 text-cosmic-comet" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Velocity</p>
                <p className="text-xl font-bold text-cosmic-comet">
                  {asteroidInfo.velocity}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-cosmic-asteroid/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cosmic-asteroid/20 rounded-lg">
                <Ruler className="w-5 h-5 text-cosmic-asteroid" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Diameter</p>
                <p className="text-xl font-bold text-cosmic-asteroid">
                  {asteroidInfo.diameter}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-danger/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-danger/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-danger" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Impact Probability
                </p>
                <p className="text-xl font-bold text-danger">
                  {asteroidInfo.impactProbability}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trajectory Chart */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cosmic-nebula rounded-full animate-pulse"></div>
              Trajectory & Probability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trajectoryData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.9)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="probability"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#EF4444" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Composition Chart */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cosmic-asteroid rounded-full animate-pulse"></div>
              Composition Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sizeData} layout="horizontal">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  type="number"
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <YAxis
                  type="category"
                  dataKey="component"
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.9)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Bar dataKey="value" fill="#FBBF24" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Info Table */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cosmic-plasma rounded-full animate-pulse"></div>
            NASA Dataset - Impactor-2025 Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground">Designation</span>
                <Badge
                  variant="outline"
                  className="bg-cosmic-nebula/20 text-cosmic-nebula border-cosmic-nebula/30"
                >
                  {asteroidInfo.designation}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground">Classification</span>
                <span className="font-medium">
                  {asteroidInfo.classification}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground">Mass</span>
                <span className="font-medium font-mono">
                  {asteroidInfo.mass}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground">Discovery Date</span>
                <span className="font-medium">
                  {asteroidInfo.discoveryDate}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground">Estimated Impact</span>
                <div className="text-right">
                  <div className="font-medium text-danger">
                    {asteroidInfo.estimatedImpact}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    T-168 hours
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground">Data Source</span>
                <Badge
                  variant="outline"
                  className="bg-cosmic-comet/20 text-cosmic-comet border-cosmic-comet/30"
                >
                  NASA JPL
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">2 minutes ago</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Tracking Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cosmic-comet rounded-full animate-pulse"></div>
                  <span className="font-medium text-cosmic-comet">Active</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
