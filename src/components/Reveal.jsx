import useReveal from "../hooks/useReveal.js";

/**
 * Reveal wrapper – wraps any children with a scroll-triggered animation.
 *
 * Props:
 *   variant  – "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom" | "fade"
 *   delay    – CSS delay string, e.g. "150ms"
 *   className – extra classes on the wrapper div
 *   as       – element tag (default "div")
 */
export default function Reveal({
  children,
  variant = "fade-up",
  delay = "0ms",
  className = "",
  as: Tag = "div",
}) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant}${className ? " " + className : ""}`}
      style={{ "--reveal-delay": delay }}
    >
      {children}
    </Tag>
  );
}
