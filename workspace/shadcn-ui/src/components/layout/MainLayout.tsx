import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {children}
    </div>
  );
}