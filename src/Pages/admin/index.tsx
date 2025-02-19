import { FormEvent, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc, //gen a random id
  collection, //
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("All fields must be filled out. ");
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    }).then(() => {
      setNameInput("")
      setUrlInput("")
      console.log("success");
    })
      .catch((error) => {
        console.log("Error to register in database" + error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        action=""
        className="flex flex-col mt-9 mb-3 w-full max-w-xl "
        onSubmit={handleRegister}
      >
        <label htmlFor="" className="text-amber-50 font-medium mt-2 mb-2">
          Link name
        </label>
        <Input
          placeholder="Type your link"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label htmlFor="" className="text-amber-50 font-medium mt-2 mb-2">
          URL name
        </label>
        <Input
          type="url"
          placeholder="Type your link"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-7">
          <div className="flex gap-2">
            <label htmlFor="" className="text-amber-50 font-medium mt-2 mb-2">
              Text color link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            ></input>
          </div>
          <div className="flex gap-2">
            <label htmlFor="" className="text-amber-50 font-medium mt-2 mb-2">
              Background color link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            ></input>
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label htmlFor="" className="text-amber-50 font-medium mt-2 mb-3">
              Preview here
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-200 rounded-2xl px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
                color: textColorInput,
              }}
            >
              <p className="font-medium">{nameInput}</p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-amber-50 font-medium gap-5 flex items-center justify-center"
        >
          Register
        </button>
      </form>
      <h2 className="font-bold text-white mb-4 text-2xl">My links</h2>

      <article
        className="flex items-center justify-between w-6/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
        style={{ backgroundColor: "#302020", color: "000" }}
      >
        <p>Chanel yt</p>
        <button className="border border-dashed py-1 px-2 cursor-pointer">
          <FiTrash size={18} color="#fff" />
        </button>
      </article>
    </div>
  );
}

export default Admin;
