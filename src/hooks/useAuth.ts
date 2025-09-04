import { auth, app } from "@/feature/Firebase"
import { onAuthStateChanged, User } from "@firebase/auth"
import React from "react"

export const useAuth = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [checking, setChecking] = React.useState<boolean>(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken()
                localStorage.setItem("bricks:auth", token);
            } else {
                localStorage.removeItem("bricks:auth")
            }
            setChecking(false);
        })

        return () => unsubscribe();
    },[])

    return { user, checking }
}