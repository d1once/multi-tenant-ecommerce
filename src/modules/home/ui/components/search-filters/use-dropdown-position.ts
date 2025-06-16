import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLElement | null> | RefObject<HTMLElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropDownWidth = 240; // Width of dropdown (w-60 = 15rem = 240px)

    // Calculate the initial position

    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Check if dropdown would go off the right edge of the viewport

    if (left + dropDownWidth > window.innerWidth) {
      // Align to the right edhe of button instead
      left = rect.right + window.scrollX - dropDownWidth;

      // If still-offscrenn, align to the right edge of viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropDownWidth - 16;
      }
    }

    //Ensure dropdown doesn't go off left edge
    if (left < 0) {
      left = 16;
    }

    return { top, left };
  };

  return { getDropdownPosition };
};
