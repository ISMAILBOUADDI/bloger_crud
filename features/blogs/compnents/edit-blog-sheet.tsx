// "use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet";

  import { insertBlogsSchema } from "@/db/schema";
  import { z } from "zod";
  import { useCreateBlog } from "../api/use-create-blogs";
import { useOpenBlog } from "../hooks/use-open-blog";
import { useNewBlog } from "../hooks/use-new-blog";
import { BlogForm } from "./blog-form";
import { useGetBlog } from "../api/use-get-one-blog";
import { title } from "process";
import { Content } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useEditBlogs } from "../api/use-edit-blog";
import { useDeleteBlog } from "../api/use-delete-blog";
import useConfirm from "../hooks/use-confirm";
  
  const formSchema = insertBlogsSchema.pick({
    title: true,
    content: true
  });
  
  type FormValues = z.input<typeof formSchema>;
  
  const EditBlogSheet = () => {
    const { isOpen, onClose, id } = useOpenBlog();
    const blogQuery = useGetBlog(id);
    const EditMutation = useEditBlogs(id)
    const deleteMutation = useDeleteBlog(id)
    const isLoading = blogQuery.isLoading;
    const isPending = EditMutation.isPending || deleteMutation.isPending;

    const onSubmit = (values: FormValues) => {

      console.log({values});
      
      EditMutation.mutate(values, {
          onSuccess: () => {
            onClose()
          }
      })
    };
    const [ConfirmDialog, confirm] = useConfirm(
      "Are you sure you want to delete this Blog?",
      "You are about to delete this accaunt."
    );
    const defaultValues = blogQuery.data
    ? {
        title: blogQuery.data.title,
        content: blogQuery.data.content,
      }
    : {
        title: "",
        content: ""
      };

      const onDelete = async () => {
        const ok = await confirm()
    
        if(ok) { 
          deleteMutation.mutate(undefined, {
            onSuccess: () => {
              onClose();
            },
          })
        }
    
      }
    

    return (
      <>
      <ConfirmDialog/>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Blog</SheetTitle>
            <SheetDescription>
              Feel free to edit a new Blog
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div
              className="absolute inset-0 flex items-center 
          justify-center"
            >
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) :(
            <BlogForm
              id={id}
             onSubmit={onSubmit}
          disabled={isPending}
          onDelete={onDelete}
          defaultValues={defaultValues}/>)}
        </SheetContent>
      </Sheet>
      </>
    );
  };
  
  export default  EditBlogSheet;