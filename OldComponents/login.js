import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/notes");
    }
  }, []);

  const onLogin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        localStorage.setItem("token", userCredential._tokenResponse.idToken);
        user = userCredential.user;
        router.push("/notes");
      })
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <button onClick={onLogin}>
        {" "}
        {loading ? "Logging you in ..." : "Login"}
      </button>
    </>
  );
}
