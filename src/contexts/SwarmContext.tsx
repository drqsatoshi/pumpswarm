import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { eventBus } from '@/lib/eventBus';

/**
 * Swarm State - TODO: Extend with actual protocol data
 */
interface SwarmNode {
  id: string;
  address: string;
  status: 'active' | 'pending' | 'offline';
  joinedAt: number;
}

interface SwarmState {
  isConnected: boolean;
  nodeId: string | null;
  peers: SwarmNode[];
  messageQueue: Array<{ from: string; payload: unknown; timestamp: number }>;
  // TODO: Add liquidity pool state
  // TODO: Add transaction history
  // TODO: Add protocol metrics
}

type SwarmAction =
  | { type: 'CONNECT'; nodeId: string }
  | { type: 'DISCONNECT' }
  | { type: 'ADD_PEER'; peer: SwarmNode }
  | { type: 'REMOVE_PEER'; nodeId: string }
  | { type: 'RECEIVE_MESSAGE'; from: string; payload: unknown }
  | { type: 'CLEAR_MESSAGES' };

const initialState: SwarmState = {
  isConnected: false,
  nodeId: null,
  peers: [],
  messageQueue: [],
};

function swarmReducer(state: SwarmState, action: SwarmAction): SwarmState {
  switch (action.type) {
    case 'CONNECT':
      return { ...state, isConnected: true, nodeId: action.nodeId };
    case 'DISCONNECT':
      return { ...state, isConnected: false, nodeId: null, peers: [] };
    case 'ADD_PEER':
      return { ...state, peers: [...state.peers, action.peer] };
    case 'REMOVE_PEER':
      return { ...state, peers: state.peers.filter(p => p.id !== action.nodeId) };
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        messageQueue: [
          ...state.messageQueue,
          { from: action.from, payload: action.payload, timestamp: Date.now() },
        ].slice(-50), // Keep last 50 messages
      };
    case 'CLEAR_MESSAGES':
      return { ...state, messageQueue: [] };
    default:
      return state;
  }
}

interface SwarmContextValue {
  state: SwarmState;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (payload: unknown) => void;
}

const SwarmContext = createContext<SwarmContextValue | null>(null);

export function SwarmProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(swarmReducer, initialState);

  // Listen to swarm events
  useEffect(() => {
    const unsubJoin = eventBus.on('swarm:join', ({ nodeId }) => {
      dispatch({
        type: 'ADD_PEER',
        peer: { id: nodeId, address: nodeId, status: 'active', joinedAt: Date.now() },
      });
    });

    const unsubLeave = eventBus.on('swarm:leave', ({ nodeId }) => {
      dispatch({ type: 'REMOVE_PEER', nodeId });
    });

    const unsubMessage = eventBus.on('swarm:message', ({ from, payload }) => {
      dispatch({ type: 'RECEIVE_MESSAGE', from, payload });
    });

    return () => {
      unsubJoin();
      unsubLeave();
      unsubMessage();
    };
  }, []);

  const connect = () => {
    // TODO: Implement actual connection logic
    const nodeId = `node_${Math.random().toString(36).slice(2, 10)}`;
    dispatch({ type: 'CONNECT', nodeId });
    eventBus.emit('swarm:join', { nodeId });
    eventBus.emit('ui:notification', { type: 'success', message: 'Connected to swarm' });
  };

  const disconnect = () => {
    if (state.nodeId) {
      eventBus.emit('swarm:leave', { nodeId: state.nodeId });
    }
    dispatch({ type: 'DISCONNECT' });
    eventBus.emit('ui:notification', { type: 'info', message: 'Disconnected from swarm' });
  };

  const sendMessage = (payload: unknown) => {
    if (!state.isConnected || !state.nodeId) {
      eventBus.emit('ui:notification', { type: 'error', message: 'Not connected to swarm' });
      return;
    }
    // TODO: Implement actual message sending
    eventBus.emit('swarm:message', { from: state.nodeId, payload });
  };

  return (
    <SwarmContext.Provider value={{ state, connect, disconnect, sendMessage }}>
      {children}
    </SwarmContext.Provider>
  );
}

export function useSwarm() {
  const context = useContext(SwarmContext);
  if (!context) {
    throw new Error('useSwarm must be used within SwarmProvider');
  }
  return context;
}
