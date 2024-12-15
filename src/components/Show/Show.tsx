import { ReactNode } from 'react';

interface ShowProps {
  when?: boolean;
  children: ReactNode;
}

/**
 * A component that renders its children only when the `when` prop is true.
 *
 * @param {object} props - The component props
 * @param {boolean} [props.when=true] - If true, the children are displayed. Defaults to true.
 * @param {React.ReactNode} props.children - The content to be displayed when `when` is true.
 *
 * @returns {React.ReactNode} - The children are rendered when `when` is true, otherwise null.
 */
const Show = ({ when = true, children }: ShowProps) => {
  return when ? <>{children}</> : null;
};

export default Show;
