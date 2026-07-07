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
        <section className="section-card profile-card">
            <div className="section-header">
                <h2>User Profile</h2>
                <p>View and manage your account information.</p>
            </div>

            <div className="mb-4">
                <p className="mb-1">
                    <strong>Email:</strong> {profile?.email || "Loading..."}
                </p>

                <p className="text-muted small mb-0">
                    <strong>User ID:</strong> {uid}
                </p>
            </div>

            {isEditing ? (
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="displayName" className="form-label">
                            Display Name
                        </label>
                        <input
                            id="displayName"
                            className="form-control"
                            type="text"
                            value={displayName}
                            onChange={(event) => setDisplayName(event.target.value)}
                            placeholder="Enter your display name"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            id="address"
                            className="form-control"
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            placeholder="Enter your address"
                        />
                    </div>

                    <div className="col-12 d-flex gap-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleUpdateProfile}
                        >
                            Save Profile
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel Editing
                        </button>
                    </div>
                </div>
            ) : (
                <div className="profile-details">
                    <div className="row g-3 mb-3">
                        <div className="col-12 col-md-6">
                            <div className="border rounded p-3 h-100">
                                <p className="text-muted mb-1">Display Name</p>
                                <p className="mb-0">
                                    {profile?.displayName || "Not set"}
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="border rounded p-3 h-100">
                                <p className="text-muted mb-1">Address</p>
                                <p className="mb-0">
                                    {profile?.address || "Not set"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                </div>
            )}

            <hr className="my-4" />

            <div className="border border-danger rounded p-3">
                <h3 className="h5 text-danger">Danger Zone</h3>
                <p className="text-muted">
                    Deleting your account will remove your profile and authentication account.
                    This action cannot be undone.
                </p>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteAccount}
                >
                    Delete Account
                </button>
            </div>
        </section>
    );
}