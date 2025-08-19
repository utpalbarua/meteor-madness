import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Shield, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertBarProps {
  className?: string;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  countdown?: number;
  timestamp: Date;
}

export function AlertBar({ className }: AlertBarProps) {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      message: 'Impactor-2025 trajectory updated - Impact probability increased to 12.4%',
      countdown: 168, // hours
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'warning', 
      message: 'New asteroid debris detected in approach vector',
      timestamp: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
    }
  ]);

  const [currentAlert, setCurrentAlert] = useState(0);

  useEffect(() => {
    if (alerts.length > 1) {
      const interval = setInterval(() => {
        setCurrentAlert((prev) => (prev + 1) % alerts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [alerts.length]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
      case 'warning':
        return <Shield className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-danger/10 border-danger text-danger';
      case 'warning':
        return 'bg-warning/10 border-warning text-warning';
      default:
        return 'bg-cosmic-nebula/10 border-cosmic-nebula text-cosmic-nebula';
    }
  };

  const formatCountdown = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  };

  if (alerts.length === 0) return null;

  const alert = alerts[currentAlert];

  return (
    <div className={cn(
      'fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300',
      getAlertColor(alert.type),
      'border-b backdrop-blur-sm',
      className
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-1 rounded-full',
            alert.type === 'critical' && 'animate-pulse-glow'
          )}>
            {getAlertIcon(alert.type)}
          </div>
          <div className="flex-1">
            <span className="font-medium">{alert.message}</span>
            {alert.countdown && (
              <div className="flex items-center gap-2 mt-1 text-sm opacity-80">
                <Clock className="w-3 h-3" />
                <span>T-{formatCountdown(alert.countdown)} to potential impact</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm opacity-60">
            {alert.timestamp.toLocaleTimeString()}
          </div>
          
          {alerts.length > 1 && (
            <div className="flex gap-1">
              {alerts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAlert(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentAlert 
                      ? 'bg-current' 
                      : 'bg-current/30 hover:bg-current/50'
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
