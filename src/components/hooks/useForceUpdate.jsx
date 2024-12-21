import React, { useCallback, useState } from "react";

const useForceUpdate = () => {
  const [, setState] = useState(0);

  const forceUpdate = useCallback(() => {
    setState((prev) => prev + 1);
  },[])
  return forceUpdate;
};

export default useForceUpdate;
