export function Select({ children }) { return <select>{children}</select>; }
export function SelectContent({ children }) { return <div>{children}</div>; }
export function SelectItem({ value, children }) { return <option value={value}>{children}</option>; }
export function SelectTrigger({ children }) { return <div>{children}</div>; }
export function SelectValue({ placeholder }) { return <span>{placeholder}</span>; }
