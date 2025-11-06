import { useEffect, useState } from 'react';
import './toggle.css';

export function Toggle() {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!pressed) return;

    const timer = setTimeout(() => {
      setPressed(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pressed]);

  return (
    <button
      aria-pressed={pressed}
      aria-label={pressed ? 'Turn off' : 'Turn on'}
      className="toggle-button"
      onClick={() => setPressed((pressed) => !pressed)}
    ></button>
  );
}
