import { useEffect, useState } from "react";

const useScrollableBody = () => {
  const [isBodyScrollable, setIsBodyScrollable] = useState(false);

  useEffect(() => {
    const handleScrollCheck = () => {
      const { body } = document;
      const isScrollable = body.scrollHeight > window.innerHeight;
      setIsBodyScrollable(isScrollable);
    };

    // Attach the event listener to check scrollability on mount
    handleScrollCheck();

    // Attach the event listener to check scrollability on resize
    window.addEventListener("resize", handleScrollCheck);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleScrollCheck);
    };
  }, []); // Empty dependency array ensures that the effect runs only on mount and unmount

  return isBodyScrollable;
};

export default useScrollableBody;
