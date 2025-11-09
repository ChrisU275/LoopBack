export function Dialog({ children, open, onOpenChange }) {
  if (!open) return null;
  return <div>{children}</div>;
}
export function DialogContent({ children }) { return <div>{children}</div>; }
export function DialogHeader({ children }) { return <div>{children}</div>; }
export function DialogTitle({ children }) { return <h2>{children}</h2>; }
export function DialogDescription({ children }) { return <p>{children}</p>; }
