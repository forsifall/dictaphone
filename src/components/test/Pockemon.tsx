import React, { useEffect, useState } from 'react';

export default function useDebounce({value,time}:{value:string, time: number}) {

  const [debounceValue,setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    },time)

    return () => {
      clearTimeout(handler);
    }

  },[value,time])

  return debounceValue
}


