import Link from "next/link";
import Image from "next/image";
import LoginButton from "./signinButton";
import SignoutButton from "./signoutButton";
import { googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "./context";

const Navbar = () => {
  const currentUser = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        {/* user is signed-in and has username */}
        {currentUser && <SignoutButton />}

        {/* user is not signed OR has not created username */}
        {!currentUser && (
          <Link passHref href="/">
            <LoginButton />
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
