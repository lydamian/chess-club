import { get, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export const alertStore = writable([]);

export function addAlert(message: string): void {
  const id = uuidv4();

  // Add the alert to the store
  alertStore.update(alerts => [...alerts, {
    id,
    message,
  }]);

  // Remove the alert after 5 seconds
  setTimeout(() => {
    alertStore.update(alerts => alerts.filter(alert => alert.id !== id));
  }, 5000);
}

export function removeAlert(id: string): void {
  alertStore.update(alerts => alerts.filter(alert => alert.id !== id));
}