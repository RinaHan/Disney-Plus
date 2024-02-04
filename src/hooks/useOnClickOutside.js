import { useEffect } from "react";

//react hooks
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // console.log("listener: ", ref.current, 'target', event.target);
      // console.log("event: ", event.target);

      //click inside modal-return
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      //click outside modal-close modal, callback
      handler();
    };

    //when click or touch, calls a 'listener' function
    document.addEventListener("mousedown", listener);
    document.addEventListener("touch", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touch", listener);
    };
  }, [ref, handler]);
}
