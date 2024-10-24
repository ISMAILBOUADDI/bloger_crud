"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import useConfirm from "@/features/blogs/hooks/use-confirm";
import { useOpenBlog } from "@/features/blogs/hooks/use-open-blog";
import { useDeleteBlog } from "@/features/blogs/api/use-delete-blog";


type Props = {
  id: number;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm( 
  "Are you sure you want to delete this blog?",
  "You are about to delete this blog."
  );

  const deleteMutation = useDeleteBlog(id);
  const { onOpen } = useOpenBlog();

  const handleDelete = async () => {
    const ok = await confirm();

    if(ok) {
      deleteMutation.mutate()
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className="size-5 mr-2"/>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={false} onClick={handleDelete}>
            <Trash className="size-5 mr-2"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};