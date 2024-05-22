import { useEffect, useRef, useState } from "react";
import useScrollableBody from "../../../hooks/isScrollableBody";

export default function ModalTemplateWithArgs({
  isOpen,
  onClose,
  width,
  children,
}) {
  if (!isOpen) {
    document.body.classList.remove("modal-open", "pr-4");
    return null;
  }
  const isBodyScrollable = useScrollableBody();
  const [translateClass, setTranslateClass] = useState(
    // eslint-disable-next-line prettier/prettier
    "-translate-y-20 opacity-0"
  );
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("modal-open");
    if (!isBodyScrollable) document.body.classList.add("pr-4");
    setTranslateClass("translate-y-0");
    return () => {
      document.body.classList.remove("modal-open");
      if (!isBodyScrollable) document.body.classList.remove("pr-4");
    };
  }, []);
  return (
    <div
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 z-10 w-full overflow-hidden md:inset-0 h-[100vh] flex justify-center"
    >
      <div
        className={`w-xl rounded-lg max-w-7xl max-h-[96vh] px-2 md:px-0 md:mx-6 xl:mx-0 my-[4vh] overflow-hidden ${
          width || "w-sm"
        } transform ${translateClass || ""} transition-transform duration-200`}
      >
        {/* Modal content */}
        <div className="bg-white shadow rounded-lg w-full" ref={modalRef}>
          <div>{children}</div>
          {/* Modal footer  */}
        </div>
      </div>
    </div>
  );
}
