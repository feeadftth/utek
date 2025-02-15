import { create } from "zustand";
import { useEditorStore } from "./useEditorStore";
import useAuthStore from "./useAuthStore";

export const useStore = create(() => ({
    editor: useEditorStore(),
    user: useAuthStore(),
}));
