"use client";

import EditBlogSheet from "@/features/blogs/compnents/edit-blog-sheet";
import NewBlogSheet from "@/features/blogs/compnents/new-blog-sheet";
import { useMountedState } from "react-use";

const SheetProvider = () => {

  const isMounted = useMountedState()

  if(!isMounted) return null
  
  return (
    <>
      <NewBlogSheet/>
      <EditBlogSheet/>
    </>
  )
}

export default SheetProvider