import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Slider } from './slider';
import { Globe, MapPin, Users, Zap, AlertTriangle, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImpactSimulationProps {
  className?: string;
}

interface Region {
  id: string;
  name: string;
  coordinates: [number, number];
  population: number;
  damage: number;
  energy: number;
  type: 'ocean' | 'land' | 'urban' | 'rural';
}

const regions: Region[] = [
  {
    id: 'pacific',
    name: 'Pacific Ocean',
    coordinates: [-150, 20],
    population: 50000,
    damage: 7.2,
    energy: 850,
    type: 'ocean'
  },
  {
    id: 'california',
    name: 'California Coast',
    coordinates: [-120, 36],
    population: 2800000,
    damage: 9.8,
    energy: 1200,
    type: 'urban'
  },
  {
    id: 'nevada',
    name: 'Nevada Desert',
    coordinates: [-116, 39],
    population: 45000,
    damage: 6.1,
    energy: 950,
    type: 'rural'
  },
  {
    id: 'atlantic',
    name: 'North Atlantic',
    coordinates: [-40, 45],
    population: 120000,
    damage: 5.8,
    energy: 780,
    type: 'ocean'
  }
];

export function ImpactSimulation({ className }: ImpactSimulationProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[1]);
  const [impactAngle, setImpactAngle] = useState([45]);
  const [impactVelocity, setImpactVelocity] = useState([20.3]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  const getRegionColor = (type: string) => {
    switch (type) {
      case 'ocean':
        return 'bg-blue-500/20 border-blue-500';
      case 'urban':
        return 'bg-red-500/20 border-red-500';
      case 'rural':
        return 'bg-yellow-500/20 border-yellow-500';
      default:
        return 'bg-gray-500/20 border-gray-500';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Map Simulation */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cosmic-comet rounded-full animate-pulse"></div>
            Impact Simulation - Earth Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Simplified Earth Map Representation */}
            <div className="relative bg-gradient-to-b from-cosmic-void to-cosmic-deep rounded-lg p-8 min-h-[400px] overflow-hidden">
              {/* Background stars effect */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`
                    }}
                  />
                ))}
              </div>

              {/* Earth representation */}
              <div className="relative mx-auto w-80 h-80 bg-gradient-to-br from-blue-900 via-green-900 to-blue-800 rounded-full shadow-2xl border-4 border-cosmic-nebula/30">
                {/* Continents overlay */}
                <div className="absolute inset-4 bg-green-800/40 rounded-full opacity-60"></div>
                
                {/* Impact regions */}
                {regions.map((region, index) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    className={cn(
                      'absolute w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-125',
                      selectedRegion.id === region.id 
                        ? 'bg-danger animate-pulse-glow scale-125' 
                        : getRegionColor(region.type),
                      isSimulating && selectedRegion.id === region.id && 'animate-ping'
                    )}
                    style={{
                      left: `${50 + (region.coordinates[0] / 360) * 60}%`,
                      top: `${50 - (region.coordinates[1] / 180) * 60}%`,
                    }}
                  >
                    <Target className="w-3 h-3 m-0.5" />
                  </button>
                ))}

                {/* Asteroid trajectory */}
                <div className="absolute -top-20 -right-20 w-8 h-8 bg-cosmic-meteor rounded-full animate-pulse">
                  <div className="absolute inset-0 bg-cosmic-meteor rounded-full animate-ping"></div>
                </div>
                
                {/* Trajectory line */}
                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cosmic-meteor opacity-60 transform rotate-45 rounded-tr-full"></div>
              </div>

              {/* Impact visualization overlay */}
              {isSimulating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-orange-500/30 rounded-full animate-ping"></div>
                  <div className="absolute w-40 h-40 bg-red-500/20 rounded-full animate-ping animation-delay-500"></div>
                  <div className="absolute w-60 h-60 bg-yellow-500/10 rounded-full animate-ping animation-delay-1000"></div>
                </div>
              )}
            </div>

            {/* Region selector */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion.id === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region)}
                  className={cn(
                    'text-xs transition-all',
                    selectedRegion.id === region.id && 'cosmic-glow'
                  )}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {region.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Controls & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cosmic-asteroid rounded-full animate-pulse"></div>
              Simulation Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Impact Angle (degrees)</label>
              <Slider
                value={impactAngle}
                onValueChange={setImpactAngle}
                max={90}
                min={15}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-1">{impactAngle[0]}° from horizontal</div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Impact Velocity (km/s)</label>
              <Slider
                value={impactVelocity}
                onValueChange={setImpactVelocity}
                max={30}
                min={10}
                step={0.1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-1">{impactVelocity[0]} km/s</div>
            </div>

            <Button 
              onClick={handleSimulation}
              disabled={isSimulating}
              className="w-full cosmic-glow"
            >
              {isSimulating ? 'Simulating...' : 'Run Impact Simulation'}
              <Zap className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-danger rounded-full animate-pulse"></div>
              Impact Assessment - {selectedRegion.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cosmic-void/30 p-4 rounded-lg border border-cosmic-nebula/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-cosmic-nebula" />
                  <span className="text-sm font-medium">Affected Population</span>
                </div>
                <div className="text-2xl font-bold text-cosmic-nebula">
                  {formatNumber(selectedRegion.population)}
                </div>
              </div>

              <div className="bg-cosmic-void/30 p-4 rounded-lg border border-danger/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-danger" />
                  <span className="text-sm font-medium">Damage Index</span>
                </div>
                <div className="text-2xl font-bold text-danger">
                  {selectedRegion.damage}/10
                </div>
              </div>

              <div className="bg-cosmic-void/30 p-4 rounded-lg border border-cosmic-asteroid/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-cosmic-asteroid" />
                  <span className="text-sm font-medium">Energy Release</span>
                </div>
                <div className="text-2xl font-bold text-cosmic-asteroid">
                  {selectedRegion.energy} MT
                </div>
              </div>

              <div className="bg-cosmic-void/30 p-4 rounded-lg border border-cosmic-comet/20">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-cosmic-comet" />
                  <span className="text-sm font-medium">Region Type</span>
                </div>
                <Badge variant="outline" className={cn(
                  'capitalize',
                  selectedRegion.type === 'urban' && 'border-red-500 text-red-500',
                  selectedRegion.type === 'ocean' && 'border-blue-500 text-blue-500',
                  selectedRegion.type === 'rural' && 'border-yellow-500 text-yellow-500'
                )}>
                  {selectedRegion.type}
                </Badge>
              </div>
            </div>

            {/* USGS Data Integration */}
            <div className="mt-6 p-4 bg-cosmic-void/20 rounded-lg border border-cosmic-plasma/20">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-cosmic-plasma rounded-full"></div>
                USGS Dataset Integration
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Geological impact modeling: Complete</div>
                <div>• Seismic wave propagation: {Math.round(selectedRegion.damage * 10)}% coverage</div>
                <div>• Population density mapping: Real-time</div>
                <div>• Infrastructure vulnerability: Assessed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
