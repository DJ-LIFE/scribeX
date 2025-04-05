import cn from 'classnames'
interface LayoutProps {
  children: React.ReactNode;
  className?: string
}
export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <>
      <div className={cn("max-w-325 bg-red mx-auto", className)}>{children}</div>
    </>
  );
};
