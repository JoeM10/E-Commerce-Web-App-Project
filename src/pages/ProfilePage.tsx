import { Profile } from "../components/Profile";

interface ProfilePageProps {
    userId: string;
}

export function ProfilePage({ userId }: ProfilePageProps) {
    return (
        <main>
            <Profile uid={userId} />
        </main>
    );
}