import "tailwindcss";
import Social from "../../components/Social";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  facebook: string;
  youtube: string;
  instagram: string;
}

function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        let lista = [] as LinkProps[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.data().id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });

        setLinks(lista);
      });
    }

    loadLinks();
  });

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }
    loadSocialLinks();
  });

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className=" md:text-4xl text-3xl font-bold text-amber-50 mt-20">
        Pedro Developer
      </h1>
      <span className="text-gray-50 mb-5 mt-3">All my links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((item) => (
          <section
            style={{ backgroundColor: item.bg }}
            key={item.id}
            className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105"
          >
            <a href={item.url} target="_blank">
              <p style={{ color: item.color }} className="text-base md:text-lg">
                {item.name}
              </p>
            </a>
          </section>
        ))}

        {/*Verifica se `socialLinks` existe e contém pelo menos uma chave antes de renderizar os ícones sociais */}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-5 my-4 ">
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={32} color="#cea727" />
            </Social>
            <Social url={socialLinks?.youtube}>
              <FaYoutube size={32} color="#cea727" />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={32} color="#cea727" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}

export default Home;
