import { useEffect, useState, useRef } from 'react';

function useOnScreen(ref) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef(null);

  const options = {
    rootMargin: '0px',
    threshold: 1.0,
  }

  const callback = ([entry]) => {
    return setIsOnScreen(entry.isIntersecting) 
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}

export default useOnScreen;
