import { useEffect, useCallback, useRef } from 'react';
import { eventBus, EventMap, EventCallback } from '@/lib/eventBus';

/**
 * Hook to subscribe to events with automatic cleanup
 */
export function useEventListener<K extends keyof EventMap>(
  event: K,
  callback: EventCallback<EventMap[K]>,
  deps: React.DependencyList = []
) {
  const callbackRef = useRef(callback);
  
  // Update ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  useEffect(() => {
    const handler: EventCallback<EventMap[K]> = (data) => {
      callbackRef.current(data);
    };
    
    const unsubscribe = eventBus.on(event, handler);
    return unsubscribe;
  }, [event]);
}

/**
 * Hook to emit events
 */
export function useEventEmitter() {
  const emit = useCallback(<K extends keyof EventMap>(event: K, data: EventMap[K]) => {
    eventBus.emit(event, data);
  }, []);

  return { emit };
}

/**
 * Combined hook for both listening and emitting
 */
export function useEvent<K extends keyof EventMap>(event: K) {
  const emit = useCallback((data: EventMap[K]) => {
    eventBus.emit(event, data);
  }, [event]);

  return {
    emit,
    on: (callback: EventCallback<EventMap[K]>) => {
      return eventBus.on(event, callback);
    },
  };
}
