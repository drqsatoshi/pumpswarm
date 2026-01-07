import { useSwarm } from '@/contexts/SwarmContext';
import { Radio, Users, MessageSquare } from 'lucide-react';

/**
 * SwarmContainer - Empty container for swarm network UI
 * TODO: Add real-time peer discovery
 * TODO: Add message broadcasting
 * TODO: Add liquidity pool info
 * TODO: Add swarm health metrics
 */
export const SwarmContainer = () => {
  const { state, connect, disconnect } = useSwarm();

  return (
    <div className="terminal-window rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-primary text-glow font-mono text-lg flex items-center gap-2">
          <Radio className="w-5 h-5" />
          {'// SWARM_STATUS'}
        </h3>
        
        <button
          onClick={state.isConnected ? disconnect : connect}
          className={state.isConnected ? 'btn-secondary text-sm' : 'btn-primary text-sm'}
        >
          {state.isConnected ? 'Disconnect' : 'Join Swarm'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold ${state.isConnected ? 'text-primary' : 'text-muted-foreground'}`}>
            {state.isConnected ? '●' : '○'}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Status</div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-secondary flex items-center justify-center gap-1">
            <Users className="w-5 h-5" />
            {state.peers.length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Peers</div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent flex items-center justify-center gap-1">
            <MessageSquare className="w-5 h-5" />
            {state.messageQueue.length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Messages</div>
        </div>
      </div>

      {state.nodeId && (
        <div className="bg-muted/20 rounded-lg p-3">
          <span className="text-muted-foreground text-xs">Node ID: </span>
          <code className="text-primary text-xs">{state.nodeId}</code>
        </div>
      )}

      {/* TODO: Add peer list */}
      {/* TODO: Add message feed */}
      {/* TODO: Add liquidity metrics */}
    </div>
  );
};
