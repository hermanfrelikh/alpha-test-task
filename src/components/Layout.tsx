import { Outlet } from 'react-router';
// import Footer from './ui/Footer';
import Header from './ui/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
