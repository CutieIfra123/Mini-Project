import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader"; 

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Enter a valid email");
    } else if (!emailRegex.test(email)) {
      setError("Invalid Email");
    } else {
      setError("");
    }

    if (!password.trim()) {
      setPassError("Enter a valid password");
    } else if (password.length < 6) {
      setPassError("Password must be at least 6 characters long");
    } else {
      setPassError("");
    }

    if (
      !email.trim() ||
      !emailRegex.test(email) ||
      !password.trim() ||
      password.length < 6
    ) {
      return;
    }

    setFirebaseError("");
    setIsLoading(true); 

    try {
      if (login) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/"); 
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registered successfully ✅");
      }
    } catch (err) {
      console.error("Firebase Error:", err);
      setIsLoading(false);

      if (err.code === "auth/email-already-in-use") {
        setFirebaseError("This email is already registered.");
      } else if (err.code === "auth/user-not-found") {
        setFirebaseError("Email not found. Please register first.");
      } else if (err.code === "auth/wrong-password") {
        setFirebaseError("Incorrect password.");
      } else {
        setFirebaseError(err.message);
      }
    }
  };

  if (isLoading) return <Loader />; 

  return (
    <div className="mx-auto w-[530px] h-auto my-10 text-center shadow-md border border-[#eee] p-4 box-border">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="E-mail Address"
            className="outline-none border border-[#ccc] bg-white px-3 py-2 w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <h2 className="text-red-500 text-sm mt-1">{error}</h2>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border border-[#ccc] bg-white px-3 py-2 w-full"
          />
          {passError && (
            <h2 className="text-red-500 text-sm mt-1">{passError}</h2>
          )}
        </div>

        {firebaseError && (
          <div className="text-red-500 text-sm mb-4">{firebaseError}</div>
        )}

        <div className="flex flex-col justify-center pb-[20px] pt-[10px]">
          <button type="submit" className="text-green-500 font-bold">
            {login ? "SIGN IN" : "REGISTER"}
          </button>
          <div className="pt-[30px]">
            <button
              onClick={() => {
                setLogin(!login);
                setFirebaseError("");
              }}
              type="button"
              className="text-red-700 font-bold"
            >
              {login ? "Go to REGISTER" : "Go to SIGN IN"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
