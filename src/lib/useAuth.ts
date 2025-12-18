import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

export function useAuth() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetch("/api/auth/logout", {
                method: "POST"
            });
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    // Fetch current user on mount to persist session across refreshes
    useEffect(() => {
        let mounted = true;
        async function loadUser() {
            setIsLoading(true);
            try {
                const res = await fetch("/api/auth/me");
                if (!mounted) return;
                const data = await res.json();
                setUser(data?.user ?? null);
            } catch (err) {
                console.error("Failed to fetch current user:", err);
                if (mounted) setUser(null);
            } finally {
                if (mounted) setIsLoading(false);
            }
        }

        loadUser();

        return () => {
            mounted = false;
        };
    }, []);

    // Always return an object so callers can safely destructure.
    // Components can check `user` and `isLoading` to decide behavior.
    return {
        user,
        setUser,
        isLoading,
        logout,
    } as {
        user: User | null;
        setUser: React.Dispatch<React.SetStateAction<User | null>>;
        isLoading: boolean;
        logout: () => Promise<void>;
    };
}
