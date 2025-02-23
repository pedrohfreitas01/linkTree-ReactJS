import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { db } from "../../services/firebaseConnection";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Social() {
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "links");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      });
    }

    loadLinks()
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {})
      .catch((error) => {
        console.log("Error to save ", error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-2xl text-white font-bold mt-8 mb-4">
        My social network
      </h1>
      <form
        action=""
        className="flex flex-col max-w-xl w-full"
        onSubmit={handleRegister}
      >
        <label htmlFor="" className="text-white font-medium mt-2 mb-2">
          Link do facebook
        </label>
        <Input
          type="url"
          placeholder="type the url"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label htmlFor="" className="text-white font-medium mt-2 mb-2">
          Link do Youtube
        </label>
        <Input
          type="url"
          placeholder="type the url"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <label htmlFor="" className="text-white font-medium mt-2 mb-2">
          Link do Instagram
        </label>
        <Input
          type="url"
          placeholder="type the url"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-2xl items-center justify-center flex mb-7 font-medium cursor-pointer"
        >
          Register Link
        </button>
      </form>
    </div>
  );
}
