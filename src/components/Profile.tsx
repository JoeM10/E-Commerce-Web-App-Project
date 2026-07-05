import { useEffect, useState } from "react";
import {
    deleteUserProfile,
    getUserProfile,
    updateUserProfile
} from "../services/userService";
import type { UserProfile } from "../types/userProfile";
import { deleteCurrentAuthUser } from "../services/authServices";

interface ProfileProps {
    uid?: string;
}

export function Profile({ uid }: ProfileProps) {
    const [profile, setProfile] = useState<UserProfile | null> (null);
    const [displayName, setDisplayName] = useState("");
    const [address, setAddress] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            if (!uid) {
                return;
            }

            const userProfile = await getUserProfile(uid);
            setProfile(userProfile);

            if (userProfile) {
                setDisplayName(userProfile.displayName);
                setAddress(userProfile.address);
            }
        }

        loadProfile();
    }, [uid]);

    async function handleUpdateProfile() {
        if (!uid) {
            return;
        }

        await updateUserProfile(uid, {
            displayName,
            address,
        });

        setProfile((currentProfile) => {
            if (!currentProfile) {
                return currentProfile;
            }

            return {
                ...currentProfile,
                displayName,
                address,
            };
        });

        setIsEditing(false);
    }

    async function handleDeleteAccount() {
        if (!uid) {
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This cannot be undone."
        )

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteUserProfile(uid);
            await deleteCurrentAuthUser();
        } catch (error) {
            console.error("Delete account failed:", error);
        }
    }

    return (
        <section>
            <h2>User Profile</h2>
            <p>Email: {profile?.email}</p>
            <p>User ID: {uid}</p>
            {isEditing ? (
                <>
                    <div>
                        <label htmlFor="displayName">Display Name</label>
                        <input
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(event) => setDisplayName(event.target.value)}
                        />
                    </div>
        
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>
        
                    <button
                        className="btn btn-info text-muted"
                        onClick={handleUpdateProfile}
                    >
                        Save Profile
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel Editing
                    </button>
                </>
            ) : (
                <>
                    <p>Display Name: {profile?.displayName || "Not set"}</p>
                    <p>Address: {profile?.address || "Not set"}</p>

                    <button
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                </>
            )}

            <button className="btn btn-danger text-muted" onClick={handleDeleteAccount}>Delete Account</button>
        </section>
    );
}