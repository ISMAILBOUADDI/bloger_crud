import { create } from "zustand"

type NewBlogState = {
    isOpen: boolean;
    onOpen: () =>  void;
    onClose: () => void;
}

export const useNewBlog = create<NewBlogState>((set) => ({
    isOpen: false, 
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))