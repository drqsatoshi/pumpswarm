/**
 * Event Bus - Pub/Sub pattern for decoupled component communication
 * TODO: Extend for WebSocket/external service integration
 */

type EventCallback<T = unknown> = (data: T) => void;
type Unsubscribe = () => void;

interface EventMap {
  // Wallet events
  'wallet:connect': { address: string; publicKey: string };
  'wallet:disconnect': void;
  'wallet:error': { message: string; code?: number };
  
  // Transaction events
  'tx:pending': { id: string; type: string };
  'tx:confirmed': { id: string; signature: string };
  'tx:failed': { id: string; error: string };
  
  // Swarm events (TODO: integrate with actual protocol)
  'swarm:join': { nodeId: string };
  'swarm:leave': { nodeId: string };
  'swarm:message': { from: string; payload: unknown };
  
  // UI events
  'ui:notification': { type: 'success' | 'error' | 'info'; message: string };
  'ui:modal': { id: string; open: boolean };
  
  // Generic
  [key: string]: unknown;
}

class EventBus {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private eventLog: Array<{ event: string; data: unknown; timestamp: number }> = [];
  private maxLogSize = 100;

  /**
   * Subscribe to an event
   */
  on<K extends keyof EventMap>(event: K, callback: EventCallback<EventMap[K]>): Unsubscribe {
    if (!this.listeners.has(event as string)) {
      this.listeners.set(event as string, new Set());
    }
    
    this.listeners.get(event as string)!.add(callback as EventCallback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.get(event as string)?.delete(callback as EventCallback);
    };
  }

  /**
   * Emit an event to all subscribers
   */
  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    // Log event for debugging/benchmarking
    this.logEvent(event as string, data);
    
    const callbacks = this.listeners.get(event as string);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[EventBus] Error in handler for ${String(event)}:`, error);
        }
      });
    }
  }

  /**
   * One-time subscription
   */
  once<K extends keyof EventMap>(event: K, callback: EventCallback<EventMap[K]>): Unsubscribe {
    const unsubscribe = this.on(event, (data) => {
      unsubscribe();
      callback(data);
    });
    return unsubscribe;
  }

  /**
   * Get event log for benchmarking
   */
  getEventLog() {
    return [...this.eventLog];
  }

  /**
   * Clear all listeners
   */
  clear(): void {
    this.listeners.clear();
    this.eventLog = [];
  }

  private logEvent(event: string, data: unknown): void {
    this.eventLog.push({
      event,
      data,
      timestamp: Date.now(),
    });
    
    // Trim log if too large
    if (this.eventLog.length > this.maxLogSize) {
      this.eventLog = this.eventLog.slice(-this.maxLogSize);
    }
  }
}

// Singleton instance
export const eventBus = new EventBus();
export type { EventMap, EventCallback, Unsubscribe };
