import { useState, useEffect } from "react";

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} el
 * @param {boolean} initialState
 */
export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = e => {
      // If the active element exists and is clicked outside of
      if (el !== null) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
        if (isActive) {
         window.addEventListener("click",onClick, true);
        }

    return () => {
      window.removeEventListener("click", onClick, true);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
