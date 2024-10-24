import { create } from "zustand"

type OpenBlogState = {
    id?: number;
    isOpen: boolean;
    onOpen: (id: number) =>  void;
    onClose: () => void;
}

export const useOpenBlog = create<OpenBlogState>((set) => ({
    id: undefined,
    isOpen: false, 
    onOpen: (id: number) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined })
}))