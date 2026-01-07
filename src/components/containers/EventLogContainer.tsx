import { useState, useEffect } from 'react';
import { eventBus } from '@/lib/eventBus';
import { Activity, Trash2 } from 'lucide-react';

/**
 * EventLogContainer - Debug/benchmark container for event bus
 * Shows all events flowing through the system
 * TODO: Add filtering by event type
 * TODO: Add export functionality
 * TODO: Add performance metrics
 */
export const EventLogContainer = () => {
  const [logs, setLogs] = useState(eventBus.getEventLog());
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLogs(eventBus.getEventLog());
    }, 500);

    return () => clearInterval(interval);
  }, [isLive]);

  const getEventColor = (event: string) => {
    if (event.startsWith('wallet:')) return 'text-secondary';
    if (event.startsWith('tx:')) return 'text-accent';
    if (event.startsWith('swarm:')) return 'text-primary';
    if (event.startsWith('ui:')) return 'text-muted-foreground';
    return 'text-foreground';
  };

  return (
    <div className="terminal-window rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary text-glow font-mono text-lg flex items-center gap-2">
          <Activity className="w-5 h-5" />
          {'// EVENT_LOG'}
        </h3>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1 rounded text-xs font-mono ${
              isLive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
            }`}
          >
            {isLive ? '● LIVE' : '○ PAUSED'}
          </button>
          <button
            onClick={() => {
              eventBus.clear();
              setLogs([]);
            }}
            className="p-1 rounded hover:bg-destructive/20"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>

      <div className="h-48 overflow-y-auto font-mono text-xs space-y-1">
        {logs.length === 0 ? (
          <p className="text-muted-foreground">{'// Waiting for events...'}</p>
        ) : (
          logs.slice().reverse().map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-muted-foreground">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span className={getEventColor(log.event)}>{log.event}</span>
              <span className="text-muted-foreground/50 truncate">
                {JSON.stringify(log.data)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* TODO: Add event type filter */}
      {/* TODO: Add performance metrics graph */}
    </div>
  );
};
