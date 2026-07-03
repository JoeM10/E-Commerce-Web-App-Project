import {
    deleteDoc,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { UserProfile } from "../types/userProfile";

export async function createUserProfile(userProfile: Omit<UserProfile, "createdAt">) {
    const userDocRef = doc(db, "users", userProfile.uid)

    await setDoc(userDocRef, {
        ...userProfile,
        createdAt: serverTimestamp(),
    })
}

export async function getUserProfile(uid: string) {
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        return null;
    }

    return userSnapshot.data() as UserProfile;
}

export async function updateUserProfile(
    uid: string,
    profileUpdates: Partial<Pick<UserProfile, "displayName" | "address">>
) {
    const userDocRef = doc(db, "users", uid);

    await updateDoc(userDocRef, profileUpdates);
}

export async function deleteUserProfile(uid: string) {
    const userDocRef = doc(db, "users", uid);

    await deleteDoc(userDocRef);
}