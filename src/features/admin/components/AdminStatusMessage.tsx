type AdminStatusMessageProps = {
  type: 'success' | 'error' | 'info';
  message: string | null;
};

export function AdminStatusMessage({ type, message }: AdminStatusMessageProps) {
  if (!message) return null;

  const className = type === 'error' ? 'status-message status-message-error' : 'status-message';

  return (
    <div className={className} role={type === 'error' ? 'alert' : 'status'}>
      {message}
    </div>
  );
}
