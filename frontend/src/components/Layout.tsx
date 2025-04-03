interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="max-w-325 bg-red mx-auto">{children}</div>
    </>
  );
};
