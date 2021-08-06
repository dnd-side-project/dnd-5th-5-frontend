import { useState, useEffect } from 'react';
const useResponsive = () => {
  const [size, setSize] = useState(null);
  useEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
  }, []);
  console.log(size);
  return size;
};

export default useResponsive;
