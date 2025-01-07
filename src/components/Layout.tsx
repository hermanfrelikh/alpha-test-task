import { Outlet } from 'react-router';
import Footer from './ui/Footer';
import Header from './ui/Footer/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <h1>Tesasdasdt</h1>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
