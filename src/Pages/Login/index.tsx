import { Link, useNavigate } from "react-router-dom";
import { VscCoffee } from "react-icons/vsc";
import { Input } from "../../components/Input";
import { FormEvent, useState } from "react";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import { FaInfoCircle } from "react-icons/fa";
import WelcomeMessage from "../../components/WelcomeMSG";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true });
        console.log("Usuário logado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Verifique seu e-mail e senha.");
      });
  }

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  const handleOpenWelcome = () => {
    setShowWelcome(true);
  };

  return (
    <div className="flex w-full h-screen items-center justify-around flex-col">
      {showWelcome && <WelcomeMessage onClose={handleCloseWelcome} />}

      {!showWelcome && (
        <button
          onClick={handleOpenWelcome}
          className="fixed top-4 right-4 z-40 p-2 rounded-full bg-blue-600 text-white shadow-lg
                     hover:bg-blue-700 transition-colors flex items-center gap-1"
        >
          <FaInfoCircle size={20} />
          <span className="text-sm hidden md:inline">Ver Dicas</span>{" "}
        </button>
      )}

      <Link to="/">
        <h1 className="mt-11 text-5xl font-bold transition-transform hover:scale-109">
          <span className="text-blue-500">Lin</span>
          <span className="bg-gradient-to-r from-blue-500 to-yellow-500 text-transparent bg-clip-text">
            K
          </span>
          <span className="text-yellow-500">
            ooffee
            <VscCoffee className=" inline-flex mb-2.5 ml-1.5 " />
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2 mb-20"
      >
        <Input
          placeholder="Digite seu e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="*********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-9 mt-3.5 bg-amber-400 rounded-3xl border-0 font-medium text-amber-50 cursor-pointer transition-transform hover:scale-102"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
