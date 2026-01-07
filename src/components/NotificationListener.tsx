import { useEventListener } from '@/hooks/useEventBus';
import { useToast } from '@/hooks/use-toast';

/**
 * Global notification listener
 * Bridges event bus to toast notifications
 */
export const NotificationListener = () => {
  const { toast } = useToast();

  useEventListener('ui:notification', ({ type, message }) => {
    toast({
      title: type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Info',
      description: message,
      variant: type === 'error' ? 'destructive' : 'default',
    });
  });

  return null;
};
