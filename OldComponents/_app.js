import Layout from "../components/layout";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context";
import { onAuthStateChanged } from "../lib/firebase";

function MyApp({ Component, pageProps }) {
  const currentUser = onAuthStateChanged;
  return (
    <UserContext.Provider value={{ currentUser: {} }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
