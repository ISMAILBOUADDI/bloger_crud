// "use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet";
//   import { useNewAccount } from "../hooks/use-new-accounts";
//   import { AccountForm } from "./account-form";
  import { insertBlogsSchema } from "@/db/schema";
  import { z } from "zod";
  import { useCreateBlog } from "../api/use-create-blogs";
import { useOpenBlog } from "../hooks/use-open-blog";
import { useNewBlog } from "../hooks/use-new-blog";
import { BlogForm } from "./blog-form";
  
  const formSchema = insertBlogsSchema.pick({
    title: true,
    content: true
  });
  
  type FormValues = z.input<typeof formSchema>;
  
  const NewBlogSheet = () => {
    const { isOpen, onClose } = useNewBlog();
  
    const mutation = useCreateBlog();
  
    const onSubmit = (values: FormValues) => {

      console.log({values});
      
      mutation.mutate(values, {
          onSuccess: () => {
            onClose()
          }
      })
    };
  
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>New Blog</SheetTitle>
            <SheetDescription>
              Feel free to Create a new Blog
            </SheetDescription>
          </SheetHeader>
            <BlogForm onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            title: "",
            content: ""
          }}/>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default NewBlogSheet;