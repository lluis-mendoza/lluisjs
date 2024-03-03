import { useState, useEffect } from "./lluis.js";

const Count = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    console.log("Component did mount");
    return () => {
      console.log("Component will unmount");
    };
  }, [count]);

  return (
    <div>
      <h1>LluisJs</h1>
      <button
        onClick={handleClick}
        style={{ 
          color: "blue"
        }}
      >
        Click me!
      </button>
      <p>{count}</p>
    </div>
  );
};

export default Count;