// Import the create function from the zustand library
import { create } from "zustand";

// Define the Block type with properties id, type, and optional content
export type Block = {
    id: string;
    type: "text" | "image" | "equation";
    content?: string;
};

// Define the EditorStore type with properties blocks, addBlock, removeBlock, and updateBlock
type EditorStore = {
    blocks: Block[];
    addBlock: (block: Block) => void;
    removeBlock: (id: string) => void;
    updateBlock: (id: string, content: string) => void;
};

// Create the useEditorStore using create from zustand
export const useEditorStore = create<EditorStore>((set) => ({
    // Initialize the store with an empty blocks array
    blocks: [],
    // Implement the addBlock function to add a new block to the blocks array
    addBlock: (block) => set((state) => ({ blocks: [...state.blocks, block] })),
    // Implement the removeBlock function to remove a block by id from the blocks array
    removeBlock: (id) => set((state) => ({ blocks: state.blocks.filter((b) => b.id !== id) })),
    // Implement the updateBlock function to update the content of a block by id
    updateBlock: (id, content) =>
        set((state) => ({
            blocks: state.blocks.map((block) =>
                block.id === id ? { ...block, content } : block
            ),
        })),
}));
