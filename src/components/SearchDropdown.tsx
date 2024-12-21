"use client";
import { ComponentPropsWithoutRef, ReactNode, useRef, useState } from "react";
import {
  offset,
  useFloating,
  useDismiss,
  useInteractions,
  FloatingArrow,
  autoUpdate,
  arrow,
  FloatingPortal,
  size,
} from "@floating-ui/react";
import { twMerge } from "tailwind-merge";

export interface RFloatingPanelProps {
  floatingOptions?: Partial<Parameters<typeof useFloating>["0"]>;
  children?: ReactNode;
  toggler?: ReactNode;
  floatingPanelProps?: ComponentPropsWithoutRef<"div">;
  mode?: "hover" | "click";
  enableArrow?: boolean;
  disableMouseLeave?: boolean;
  isOpen: boolean;
}

/**
 * Props for the `RFloatingPanel` component.
 *
 * @typedef {Object} RFloatingPanelProps
 * @property {Partial<Parameters<typeof useFloating>["0"]>} [floatingOptions] - Options to customize the floating behavior, such as placement and middleware.
 * @property {ReactNode} [children] - Content to be displayed inside the floating panel.
 * @property {ReactNode} [toggler] - Element that toggles the visibility of the floating panel when clicked.
 * @property {ComponentPropsWithoutRef<"div">} [floatingPanelProps] - Additional props to be passed to the floating panel's wrapper div.
 */

/**
 * A floating panel component that can be toggled open and closed. It uses `@floating-ui/react` to position the panel relative to a reference element.
 *
 * @param {RFloatingPanelProps} props - The props for the component.
 * @returns {JSX.Element} The rendered floating panel component.
 */
const SearchDropdown = ({
  floatingOptions = {},
  floatingPanelProps = {},
  toggler,
  children,
  mode = "click",
  enableArrow = false,
  isOpen,
}: RFloatingPanelProps) => {
  const controllerState = useState(false);
  const arrowRef = useRef(null);
  const setIsOpen = floatingOptions?.onOpenChange || controllerState[1];

  const { refs, floatingStyles, context } = useFloating({
    open: true,
    onOpenChange: () => {},
    placement: "bottom",
    middleware: [
      offset(5),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,

    ...floatingOptions,
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const { className, ...computedProps } = floatingPanelProps;

  return (
    <>
      <span role="button" ref={refs.setReference} className="w-fit max-w-2xl">
        {toggler}
      </span>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className={twMerge(
              "w-full rounded-lg bg-v2-white z-9999 max-w-2xl",
              className
            )}
            style={{ ...floatingStyles, position: "fixed" }}
            {...getFloatingProps()}
            {...computedProps}
          >
            {children}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default SearchDropdown;
