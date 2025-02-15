import { create } from 'zustand';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { app } from '../firebase'; // Import the initialized Firebase app
import { onAuthStateChanged } from 'firebase/auth';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: Error | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const useAuthStore = create<AuthState>((set: (partial: Partial<AuthState>) => void) => ({
    user: null,
    loading: false,
    error: null,
    login: async () => {
        set({ loading: true, error: null });
        try {
            const result = await signInWithPopup(auth, provider);
            set({ user: result.user, loading: false });
        } catch (error) {
            set({ error: error as Error, loading: false });
        }
    },
    logout: async () => {
        set({ loading: true, error: null });
        try {
            await signOut(auth);
            set({ user: null, loading: false });
        } catch (error) {
            set({ error: error as Error, loading: false });
        }
    }
}));

onAuthStateChanged(auth, (user) => {
    useAuthStore.setState({ user });
});

export default useAuthStore;
