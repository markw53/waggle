import type { ReactNode, FC } from "react";
import Header from "../compoments/Header";
import Footer from "../compoments/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-background text-foreground relative">
    <Header />
    <main
      role="main"
      tabIndex={-1}
      className="flex-grow container mx-auto px-4 py-6 pb-8 relative"
    >
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;