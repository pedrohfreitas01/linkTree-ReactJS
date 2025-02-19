import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";
import { ReactNode, use, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";




interface PrivateProps {
    children: ReactNode
}

export function PrivateRoute({ children }: PrivateProps): any {

    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    uid: user?.uid, //uid == id no firebase
                    email: user?.email
                };

                localStorage.setItem("@reactlinks", JSON.stringify(userData))
                setLoading(false)
                setSigned(true)
            } else {
                console.log("nao tem user logado");
                setLoading(false)
                setSigned(false)
            }
        })

        return () => {          // cancelar o "olheiro" onAuthchange
            unsub()
        }
    })


    if (loading) {
        return <div></div>
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return (
        children
    )
}