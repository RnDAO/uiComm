class EventEmitter {
  events: { [key: string]: Array<(data: any) => void> } = {};

  subscribe = (event: string, callback: (data: any) => void) => {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    return () =>
      (this.events[event] = this.events[event].filter((fn) => fn !== callback));
  };

  emit = (event: string, data: any) => {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  };
}

export const tokenRefreshEventEmitter = new EventEmitter();
