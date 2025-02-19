import { Link, useNavigate } from "react-router-dom"
import { VscCoffee } from "react-icons/vsc";
import { Input } from "../../components/Input";
import { FormEvent, useState } from "react";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  function handleSubmit(e: FormEvent) {
    e.preventDefault()


    if (email === '' || password === '') {
      alert('Field the form !!!')
      return
    }


    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true })
        console.log("logado");
      })


    console.log({
      email: email,
      password: password
    });
  }


  return (
    <div className="flex w-full h-screen items-center justify-around flex-col">
      <Link to="/">
        <h1 className="mt-11 text-5xl font-bold transition-transform hover:scale-109" >
          <span className="text-blue-500">Lin</span>
          <span className="bg-gradient-to-r from-blue-500 to-yellow-500 text-transparent bg-clip-text">K</span>
          <span className="text-yellow-500">ooffee<VscCoffee className=" inline-flex mb-2.5 ml-1.5 " /></span>
        </h1>
      </Link>

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2 mb-20" action="">
        <Input placeholder="type your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)


        }
        ></Input>
        <Input placeholder="*********" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        ></Input>

        <button type="submit" className="h-9  mt-3.5 bg-amber-400 rounded-3xl border-0 font-medium text-amber-50 cursor-pointer  transition-transform hover:scale-102" >
          Login
        </button>
      </form>

    </div>
  )
}

export default Login