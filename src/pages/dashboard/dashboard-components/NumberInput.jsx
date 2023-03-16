import React, { useState } from 'react';

const NumberInput = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  const handleChange = (event) => {
    setCount(parseInt(event.target.value));
  };

  return (
    <div className="items-center inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">
      <button
        onClick={decrement}
        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-l"
      >
        -
      </button>
      <input
        value={count}
        onChange={handleChange}
        className="number-input text-center w-16 py-2 px-4 text-black"
      />
      <button
        onClick={increment}
        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-r"
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
