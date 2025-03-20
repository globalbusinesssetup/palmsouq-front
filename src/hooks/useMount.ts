import * as React from 'react';

const useMount = () => {
  const [mounted, setMounted] = React.useState(false);

  /**
   * A React effect hook that runs only once, on mount. It sets the `mounted`
   * state variable to `true`, indicating that the component has mounted.
   */
  React.useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Returns the `mounted` state variable.
   * @returns {boolean} - The `mounted` state variable.
   */
  return mounted;
};

export default useMount;
