import { useState } from 'react';

const useLoadingState = (init) => {
    const [loading, setLoadingState] = useState(init);
  
    const setLoading = (eventName, value) => {
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [eventName]: value,
      }));
    };
  
    return {
      loading,
      setLoading,
    };
};

export default useLoadingState;