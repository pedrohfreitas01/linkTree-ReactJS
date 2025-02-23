import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc, //gen a random id
  collection, //
  deleteDoc,
  doc,  //acessar um item especifico do banco
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  });

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
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        console.log("success");
      })
      .catch((error) => {
        console.log("Error to register in database" + error);
      });
  }

  async function HandleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
    console.log(id);
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

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-6/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <button
            className="border border-dashed py-1 px-2 cursor-pointer"
            onClick={() => HandleDeleteLink(link.id)}
          >
            <FiTrash size={18} color="#fff" />
          </button>
        </article>
      ))}
    </div>
  );
}

export default Admin;
