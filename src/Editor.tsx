import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useEditorStore } from "@/store/useEditorStore";
import useAuthStore from "@/store/useAuthStore";

const DraggableBlock: React.FC<{ id: string; type: string }> = ({ id, type }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="p-4 bg-blue-200 rounded-md cursor-grab"
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
            }}
        >
            {type} Block
        </div>
    );
};

const DropArea: React.FC = () => {
    const { setNodeRef } = useDroppable({ id: "dropzone" });
    const blocks = useEditorStore((state) => state.blocks);

    return (
        <div ref={setNodeRef} className="p-6 border-dashed border-2 border-gray-400 min-h-[200px] flex flex-col items-center">
            {blocks.length === 0 ? "Drop items here" : blocks.map((block) => <DraggableBlock key={block.id} id={block.id} type={block.type} />)}
        </div>
    );
};

const EditorPage: React.FC = () => {
    const navigate = useNavigate();
    const { addBlock } = useEditorStore();
    const { user, logout } = useAuthStore();

    return (
        <DndContext>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-2xl font-bold mb-4">PDF Editor</h1>

                {user ? (
                    <p>Welcome, {user.displayName}!</p>
                ) : (
                    <p>Please log in to save your work.</p>
                )}

                <Card className="p-6 w-full max-w-3xl min-h-[500px] flex flex-col items-center justify-center">
                    <DropArea />
                </Card>

                <div className="mt-4 flex space-x-2">
                    <Button onClick={() => addBlock({ id: crypto.randomUUID(), type: "text" })} className="bg-green-500">
                        Add Text Block
                    </Button>
                    <Button onClick={() => navigate("/export")} className="bg-blue-500">
                        Export PDF
                    </Button>
                    {user && (
                        <Button onClick={logout} className="bg-red-500">
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </DndContext>
    );
};

export default EditorPage;
