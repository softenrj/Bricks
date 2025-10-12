import { FSTYPE, Project, ProjectContext, ProjectFile } from "@/types/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectContextNode extends ProjectFile {
    child?: ProjectContextNode[];
    parent?: string;
}

const initialState: ProjectContextNode[] = [];

const ContextSlice = createSlice({
    name: "contextSlice",
    initialState,
    reducers: {
        setContext: (_state, action: PayloadAction<ProjectContextNode[]>) => {
            _state = action.payload;
            return _state;
        },

        addChildren: (
            _state,
            action: PayloadAction<{ parentId: string; children: ProjectFile[] }>
        ) => {
            const { parentId, children } = action.payload;

            const findNode = (nodes: ProjectContextNode[]): ProjectContextNode | undefined => {
                for (const node of nodes) {
                    if (node._id.toString() === parentId) return node;
                    if (node.child) {
                        const found = findNode(node.child);
                        if (found) return found;
                    }
                }
                return undefined;
            };

            const parentNode = findNode(_state);

            if (!parentNode || parentNode.type !== "folder") return;

            const enrichedChildren: ProjectContextNode[] = children.map((item) => ({
                ...item,
                parent: parentId,
                ...(item.type === "folder" ? { child: [] } : {}),
            }));

            parentNode.child = enrichedChildren;
        },
    },
});

export const { setContext, addChildren } = ContextSlice.actions;
export default ContextSlice.reducer;
