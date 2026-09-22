import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
