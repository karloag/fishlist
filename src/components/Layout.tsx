import { Link } from "react-router-dom";
type LayoutProps = {
  title: string;
  children: React.ReactNode; //content
};

function Layout({ title, children }: LayoutProps) {
  return (
    <div className="w-[70vw] max-w-5xl min-w-[300px] mx-auto min-h-screen bg-gray-950 text-white flex flex-col">
      <nav className="p-4 bg-gray-900 flex space-x-6 justify-center">
         <Link to="/"> Home </Link>
         <Link to="/list"> List </Link>
         <Link to="/about"> About </Link>
      </nav>
      <main className="flex-1 px-6 py-8 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
            {children}
      </main>
      <footer className="p-4 bg-gray-900 text-center text-xs">
        © 2025 Fishlist
      </footer>
    </div>  
  );
}

export default Layout;