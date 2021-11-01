import Navbar from "./navbar";

const Layout = ({ children, pageProps }) => {
  return (
    <>
      <Navbar id="top" />
      <main>{children}</main>
    </>
  );
};

export default Layout;
