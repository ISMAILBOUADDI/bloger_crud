'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewBlog } from "@/features/blogs/hooks/use-new-blog";
import { Loader2, Plus } from "lucide-react";

// import { columns } from "./columns";
// import { DataTable } from "@/components/data-table";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { useGetBlogs } from "@/features/blogs/api/use-get-blogs";
import { columns } from "./columns";
import { useBulkDeleteblogs } from "@/features/blogs/api/use-bulk-delete";
export default function Home() {
  const newBlog = useNewBlog();
  const deleteBlogs = useBulkDeleteblogs()
  const blogsQuery = useGetBlogs();
  const blogs = blogsQuery.data || [];
  const isDisabled = blogsQuery.isLoading || deleteBlogs.isPending
  if (blogsQuery.isLoading) {
    return (
      <div className="max-x-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48"/>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-sping" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div>
      {/* <Button onClick={onOpen}>test</Button> */}

      <div className="max-x-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">blog</CardTitle>
          <Button onClick={newBlog.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={blogs}
            filterKey="title"
            onDelete={(row) => {
              const ids = row.map((r) =>  r.original.id)
              deleteBlogs.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
