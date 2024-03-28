interface LogEvent {
  action: string;
}

export const log = ({ action }: LogEvent) => {
  if ('gtag' in window && typeof window.gtag === 'function') {
    window.gtag('event', action);
  }
};
