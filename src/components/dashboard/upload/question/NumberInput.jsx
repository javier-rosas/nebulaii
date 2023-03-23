import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMinSpeakerCount } from '@/redux/fileSlice';
import { setMaxSpeakerCount } from '@/redux/fileSlice';

const NumberInput = () => {
  const [count, setCount] = useState(2);
  const dispatch = useDispatch()

  const setSpeakerCount = useCallback(count => {
    dispatch(setMinSpeakerCount(count));
    dispatch(setMaxSpeakerCount(count));
  });

  useEffect(() => {
    setSpeakerCount(2)
  }, [setSpeakerCount])

  const increment = () => {
    setCount(count + 1);
    setSpeakerCount(count)
  };

  const decrement = () => {
    if (count > 2) {
      setCount(count - 1);
      setSpeakerCount(count)
    } else {
      setCount(2);
      setSpeakerCount(count)
    }
  };

  const handleChange = (event) => {
    setCount(parseInt(event.target.value));
    setSpeakerCount(count)
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
