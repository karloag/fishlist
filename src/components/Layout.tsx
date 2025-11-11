import { Link } from "react-router-dom";
type LayoutProps = {
  title: string;
  children: React.ReactNode; //content
};

function Layout({ title, children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <nav className="p-4 bg-gray-900 flex space-x-6">
         <Link to="/"> Home </Link>
         <Link to="/list"> List </Link>
         <Link to="/about"> About </Link>
      </nav>
      <main className="flex-1 w-full px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {children}
          </div>
      </main>
      <footer className="p-4 bg-gray-900 text-center text-xs">
        © 2025 Fishlist
      </footer>
    </div>
  );
}

export default Layout;