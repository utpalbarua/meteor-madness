import React from "react";
import { Starfield } from "@/components/ui/starfield";
import { AlertBar } from "@/components/ui/alert-bar";
import { AsteroidDataPanel } from "@/components/ui/asteroid-data-panel";
import { ImpactSimulation } from "@/components/ui/impact-simulation";
import { MitigationStrategies } from "@/components/ui/mitigation-strategies";
import { CollaborationZone } from "@/components/ui/collaboration-zone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Satellite,
  Target,
  Shield,
  MessageSquare,
  Activity,
  Clock,
  Users,
  Globe,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Cosmic starfield background */}
      <Starfield className="opacity-60" />

      {/* Real-time alert bar */}
      <AlertBar />

      {/* Main dashboard content */}
      <div className="relative z-10 pt-16">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-cosmic-nebula/20 rounded-full cosmic-glow">
                <Target className="w-8 h-8 text-cosmic-nebula" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cosmic-nebula via-cosmic-star to-cosmic-comet bg-clip-text text-transparent">
                Meteor Madness
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interactive Planetary Defense Dashboard for Impactor-2025 Threat
              Assessment & Response Coordination
            </p>

            {/* Status indicators */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-danger rounded-full animate-pulse"></div>
                <span className="text-sm">High Alert Status</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cosmic-comet" />
                <span className="text-sm">Real-time Tracking Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cosmic-nebula" />
                <span className="text-sm">47 Decision Makers Online</span>
              </div>
            </div>
          </div>

          {/* Mission Critical Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/80 backdrop-blur-sm border-danger/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-danger mb-1">
                  T-168h
                </div>
                <div className="text-sm text-muted-foreground">
                  Time to Impact
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-cosmic-nebula/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cosmic-nebula mb-1">
                  12.4%
                </div>
                <div className="text-sm text-muted-foreground">
                  Impact Probability
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-cosmic-comet/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cosmic-comet mb-1">
                  26.1M km
                </div>
                <div className="text-sm text-muted-foreground">
                  Current Distance
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-cosmic-asteroid/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cosmic-asteroid mb-1">
                  1.2 km
                </div>
                <div className="text-sm text-muted-foreground">
                  Asteroid Diameter
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Satellite className="w-4 h-4" />
                <span className="hidden sm:inline">Data</span>
              </TabsTrigger>
              <TabsTrigger
                value="simulation"
                className="flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Simulation</span>
              </TabsTrigger>
              <TabsTrigger
                value="mitigation"
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Mitigation</span>
              </TabsTrigger>
              <TabsTrigger
                value="collaboration"
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Collaborate</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab - Combined dashboard */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Quick Data Summary */}
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cosmic-nebula rounded-full animate-pulse"></div>
                      Mission Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Asteroid Classification
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-cosmic-nebula/20 text-cosmic-nebula border-cosmic-nebula/30"
                        >
                          Near-Earth Asteroid (NEA)
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Threat Level
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-danger/20 text-danger border-danger/30"
                        >
                          Critical
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Discovery Date
                        </div>
                        <div className="font-medium">2023-11-15</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Estimated Impact
                        </div>
                        <div className="font-medium text-danger">
                          2025-04-13 14:23 UTC
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/30">
                      <div className="text-sm text-muted-foreground mb-2">
                        Active Strategies
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Nuclear Deflection</span>
                          <Badge
                            variant="outline"
                            className="text-xs bg-cosmic-comet/20 text-cosmic-comet border-cosmic-comet/30"
                          >
                            In Progress
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Mass Evacuation</span>
                          <Badge
                            variant="outline"
                            className="text-xs bg-warning/20 text-warning border-warning/30"
                          >
                            Standby
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Shelter Network</span>
                          <Badge
                            variant="outline"
                            className="text-xs bg-cosmic-comet/20 text-cosmic-comet border-cosmic-comet/30"
                          >
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Simulation Preview */}
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cosmic-comet rounded-full animate-pulse"></div>
                      Impact Zones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mx-auto w-60 h-60 bg-gradient-to-br from-blue-900 via-green-900 to-blue-800 rounded-full shadow-2xl border-4 border-cosmic-nebula/30">
                      <div className="absolute inset-4 bg-green-800/40 rounded-full opacity-60"></div>

                      {/* Potential impact zones */}
                      <div className="absolute w-4 h-4 bg-danger rounded-full top-1/3 left-1/3 animate-pulse"></div>
                      <div className="absolute w-3 h-3 bg-warning rounded-full top-1/2 left-1/2 animate-pulse"></div>
                      <div className="absolute w-3 h-3 bg-cosmic-nebula rounded-full bottom-1/3 right-1/3 animate-pulse"></div>

                      {/* Asteroid trajectory */}
                      <div className="absolute -top-10 -right-10 w-6 h-6 bg-cosmic-meteor rounded-full animate-pulse">
                        <div className="absolute inset-0 bg-cosmic-meteor rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-danger rounded-full"></div>
                        <span>High Risk (Urban)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <span>Medium Risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cosmic-nebula rounded-full"></div>
                        <span>Low Risk (Ocean)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cosmic-meteor rounded-full"></div>
                        <span>Trajectory</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity Feed */}
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cosmic-plasma rounded-full animate-pulse"></div>
                    Mission Timeline & Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 bg-cosmic-void/20 rounded-lg border border-danger/20">
                      <Clock className="w-4 h-4 text-danger mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">
                          Nuclear deflection mission parameters finalized
                        </div>
                        <div className="text-xs text-muted-foreground">
                          5 minutes ago • Mission Director Dr. Sarah Chen
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-cosmic-void/20 rounded-lg border border-warning/20">
                      <Clock className="w-4 h-4 text-warning mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">
                          European shelter network 94% complete
                        </div>
                        <div className="text-xs text-muted-foreground">
                          25 minutes ago • Prof. Elena Volkov
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-cosmic-void/20 rounded-lg border border-cosmic-nebula/20">
                      <Clock className="w-4 h-4 text-cosmic-nebula mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">
                          Trajectory update: Impact probability increased to
                          12.4%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          45 minutes ago • NASA JPL Tracking
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Asteroid Data Panel Tab */}
            <TabsContent value="data">
              <AsteroidDataPanel />
            </TabsContent>

            {/* Impact Simulation Tab */}
            <TabsContent value="simulation">
              <ImpactSimulation />
            </TabsContent>

            {/* Mitigation Strategies Tab */}
            <TabsContent value="mitigation">
              <MitigationStrategies />
            </TabsContent>

            {/* Collaboration Zone Tab */}
            <TabsContent value="collaboration">
              <CollaborationZone />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
