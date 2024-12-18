import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getToken } from "@/api/auth"

type Category = {
  id: number;
  name: string;
  code: string;
};

type DeleteCategoryDialogProps = {
  id: number;
  categoryName: string;
  setPosts: React.Dispatch<React.SetStateAction<Category[]>>;
  posts: Category[];
};

export function DeleteCategoryDialog({
  id,
  categoryName,
  setPosts,
  posts,
}: DeleteCategoryDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteCategory = async (id: number) => {
      const response = await fetch(`http://localhost:8090/api/v1/categories/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + getToken(),
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
        document.location.reload();
      }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Usuń</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Potwierdzenie usunięcia</DialogTitle>
          <DialogDescription>
            Czy na pewno chcesz usunąć kategorię <strong>{categoryName}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Anuluj
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={() => deleteCategory(id)}
          >
            Usuń
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
