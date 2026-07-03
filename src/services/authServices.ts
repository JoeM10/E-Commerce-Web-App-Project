import { deleteUser, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export async function logoutUser() {
    await signOut(auth);
}

export async function deleteCurrentAuthUser() {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error("No user is currently signed in.");
    }

    await deleteUser(currentUser);
}