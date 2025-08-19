import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Progress } from './progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { 
  Rocket, 
  Shield, 
  Users, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MitigationStrategiesProps {
  className?: string;
}

interface Strategy {
  id: string;
  name: string;
  type: 'deflection' | 'evacuation' | 'shielding';
  description: string;
  successRate: number;
  timeRequired: string;
  cost: string;
  risk: 'low' | 'medium' | 'high';
  outcomes: {
    success: string;
    partial: string;
    failure: string;
  };
  requirements: string[];
  timeline: Array<{
    phase: string;
    duration: string;
    status: 'completed' | 'in-progress' | 'pending';
  }>;
}

const strategies: Strategy[] = [
  {
    id: 'nuclear-deflection',
    name: 'Nuclear Pulse Deflection',
    type: 'deflection',
    description: 'Deploy nuclear charges to alter asteroid trajectory through controlled explosions',
    successRate: 78,
    timeRequired: '120 days',
    cost: '$2.8B',
    risk: 'high',
    outcomes: {
      success: 'Asteroid diverted to safe trajectory, no Earth impact',
      partial: 'Trajectory altered but fragments may still pose regional threats',
      failure: 'No significant trajectory change, impact scenario unchanged'
    },
    requirements: [
      'Nuclear payload delivery system',
      'Precise trajectory calculations',
      'International space cooperation',
      'Launch window availability'
    ],
    timeline: [
      { phase: 'Mission Planning', duration: '15 days', status: 'completed' },
      { phase: 'Payload Preparation', duration: '30 days', status: 'in-progress' },
      { phase: 'Launch & Transit', duration: '45 days', status: 'pending' },
      { phase: 'Deflection Execution', duration: '30 days', status: 'pending' }
    ]
  },
  {
    id: 'kinetic-impactor',
    name: 'Kinetic Impactor Mission',
    type: 'deflection',
    description: 'High-speed spacecraft collision to gradually change asteroid orbit',
    successRate: 65,
    timeRequired: '180 days',
    cost: '$1.2B',
    risk: 'medium',
    outcomes: {
      success: 'Gradual orbital shift moves impact point to ocean or uninhabited area',
      partial: 'Trajectory modified but impact still threatens populated regions',
      failure: 'Insufficient mass transfer, minimal trajectory change achieved'
    },
    requirements: [
      'Heavy-lift launch capability',
      'Advanced guidance systems',
      'Asteroid composition analysis',
      'Multiple launch opportunities'
    ],
    timeline: [
      { phase: 'Mission Design', duration: '20 days', status: 'completed' },
      { phase: 'Spacecraft Assembly', duration: '60 days', status: 'in-progress' },
      { phase: 'Launch & Navigation', duration: '80 days', status: 'pending' },
      { phase: 'Impact Execution', duration: '20 days', status: 'pending' }
    ]
  },
  {
    id: 'mass-evacuation',
    name: 'Global Mass Evacuation',
    type: 'evacuation',
    description: 'Coordinate worldwide population displacement from high-risk impact zones',
    successRate: 85,
    timeRequired: '90 days',
    cost: '$45B',
    risk: 'medium',
    outcomes: {
      success: 'Minimal casualties, population safely relocated to secure zones',
      partial: 'Most population evacuated but significant infrastructure losses',
      failure: 'Evacuation bottlenecks lead to casualties and social breakdown'
    },
    requirements: [
      'International coordination',
      'Emergency shelter preparation',
      'Transportation infrastructure',
      'Supply chain management'
    ],
    timeline: [
      { phase: 'Emergency Declaration', duration: '3 days', status: 'completed' },
      { phase: 'Resource Mobilization', duration: '15 days', status: 'in-progress' },
      { phase: 'Population Movement', duration: '60 days', status: 'pending' },
      { phase: 'Safe Zone Setup', duration: '12 days', status: 'pending' }
    ]
  },
  {
    id: 'underground-shelters',
    name: 'Underground Shelter Network',
    type: 'shielding',
    description: 'Rapid construction of reinforced underground facilities for population protection',
    successRate: 92,
    timeRequired: '150 days',
    cost: '$78B',
    risk: 'low',
    outcomes: {
      success: 'Population protected in hardened shelters, minimal direct casualties',
      partial: 'Partial shelter coverage, reduced but not eliminated casualties',
      failure: 'Insufficient shelter capacity leads to significant loss of life'
    },
    requirements: [
      'Heavy construction equipment',
      'Deep geological surveys',
      'Life support systems',
      'Emergency supply stockpiles'
    ],
    timeline: [
      { phase: 'Site Survey', duration: '10 days', status: 'completed' },
      { phase: 'Construction Phase 1', duration: '60 days', status: 'in-progress' },
      { phase: 'Construction Phase 2', duration: '60 days', status: 'pending' },
      { phase: 'System Integration', duration: '20 days', status: 'pending' }
    ]
  }
];

export function MitigationStrategies({ className }: MitigationStrategiesProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>(strategies[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const getStrategyIcon = (type: string) => {
    switch (type) {
      case 'deflection':
        return <Rocket className="w-5 h-5" />;
      case 'evacuation':
        return <Users className="w-5 h-5" />;
      case 'shielding':
        return <Shield className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deflection':
        return 'cosmic-nebula';
      case 'evacuation':
        return 'cosmic-comet';
      case 'shielding':
        return 'cosmic-asteroid';
      default:
        return 'cosmic-plasma';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-success border-success';
      case 'medium':
        return 'text-warning border-warning';
      case 'high':
        return 'text-danger border-danger';
      default:
        return 'text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Strategy Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategies.map((strategy) => (
          <Card
            key={strategy.id}
            className={cn(
              'cursor-pointer transition-all duration-300 hover:scale-105',
              'bg-card/80 backdrop-blur-sm border-border/50',
              selectedStrategy.id === strategy.id && 'cosmic-glow border-cosmic-nebula'
            )}
            onClick={() => setSelectedStrategy(strategy)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={cn(
                  'p-2 rounded-lg',
                  `bg-${getTypeColor(strategy.type)}/20`
                )}>
                  {getStrategyIcon(strategy.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 truncate">{strategy.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {strategy.type}
                    </Badge>
                    <Badge variant="outline" className={cn('text-xs', getRiskColor(strategy.risk))}>
                      {strategy.risk} risk
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-medium">{strategy.successRate}%</span>
                    </div>
                    <Progress value={strategy.successRate} className="h-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Strategy Information */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className={cn(
              'p-2 rounded-lg',
              `bg-${getTypeColor(selectedStrategy.type)}/20`
            )}>
              {getStrategyIcon(selectedStrategy.type)}
            </div>
            {selectedStrategy.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <p className="text-muted-foreground">{selectedStrategy.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-cosmic-void/30 p-4 rounded-lg border border-cosmic-nebula/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-cosmic-nebula" />
                    <span className="text-sm font-medium">Success Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-cosmic-nebula">
                    {selectedStrategy.successRate}%
                  </div>
                </div>

                <div className="bg-cosmic-void/30 p-4 rounded-lg border border-cosmic-comet/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-cosmic-comet" />
                    <span className="text-sm font-medium">Time Required</span>
                  </div>
                  <div className="text-lg font-bold text-cosmic-comet">
                    {selectedStrategy.timeRequired}
                  </div>
                </div>

                <div className="bg-cosmic-void/30 p-4 rounded-lg border border-cosmic-asteroid/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-cosmic-asteroid" />
                    <span className="text-sm font-medium">Estimated Cost</span>
                  </div>
                  <div className="text-lg font-bold text-cosmic-asteroid">
                    {selectedStrategy.cost}
                  </div>
                </div>

                <div className="bg-cosmic-void/30 p-4 rounded-lg border border-border/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Risk Level</span>
                  </div>
                  <Badge variant="outline" className={cn('text-sm capitalize', getRiskColor(selectedStrategy.risk))}>
                    {selectedStrategy.risk}
                  </Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="outcomes" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-medium text-success mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Success Scenario
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedStrategy.outcomes.success}</p>
                </div>

                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium text-warning mb-2 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Partial Success
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedStrategy.outcomes.partial}</p>
                </div>

                <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
                  <h4 className="font-medium text-danger mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Failure Scenario
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedStrategy.outcomes.failure}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4 mt-6">
              <div className="space-y-3">
                {selectedStrategy.timeline.map((phase, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-cosmic-void/20 rounded-lg border border-border/30">
                    {getStatusIcon(phase.status)}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{phase.phase}</h4>
                        <span className="text-sm text-muted-foreground">{phase.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={cn(
                          'text-xs capitalize',
                          phase.status === 'completed' && 'border-success text-success',
                          phase.status === 'in-progress' && 'border-warning text-warning',
                          phase.status === 'pending' && 'border-muted-foreground text-muted-foreground'
                        )}>
                          {phase.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4 mt-6">
              <div className="grid gap-3">
                {selectedStrategy.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-cosmic-void/20 rounded-lg border border-border/30">
                    <CheckCircle className="w-4 h-4 text-cosmic-comet" />
                    <span className="text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex gap-4">
            <Button className="flex-1 cosmic-glow">
              Initiate Strategy
              <Rocket className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="flex-1">
              Request Detailed Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
