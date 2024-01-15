import React, { useState, useEffect } from 'react';

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const speed = 20;

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setPosition((prev) => ({ ...prev, y: prev.y - speed }));
        break;
      case 'ArrowDown':
        setPosition((prev) => ({ ...prev, y: prev.y + speed }));
        break;
      case 'ArrowLeft':
        setPosition((prev) => ({ ...prev, x: prev.x - speed }));
        break;
      case 'ArrowRight':
        setPosition((prev) => ({ ...prev, x: prev.x + speed }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '500px', width: '500px', border: '1px solid black' }}>
      <div
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: '50px',
          height: '50px',
          background: 'red',
          transition: "all 0.5s linear"
        }}
      />
    </div>
  );
};

export default App;
