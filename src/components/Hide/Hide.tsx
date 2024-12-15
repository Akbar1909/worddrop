import { ReactNode } from 'react';

interface HideProps {
  when?: boolean;
  children: ReactNode;
}

/**
 * A component that renders its children only when the `when` prop is false.
 *
 * @param {object} props - The component props
 * @param {boolean} [props.when=true] - If true, the children are hidden. Defaults to true.
 * @param {React.ReactNode} props.children - The content to be hidden when `when` is true.
 *
 * @returns {React.ReactNode} - The children are rendered when `when` is false, otherwise null.
 */
const Hide = ({ when = true, children }: HideProps) => {
  return !when ? <>{children}</> : null;
};

export default Hide;
