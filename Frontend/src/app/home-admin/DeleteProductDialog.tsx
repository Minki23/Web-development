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

type Product = {
  id: number;
  name: string;
  price: number;
  weight: number;
  category: number;
};

type DeleteProductDialogProps = {
  id: number;
  productName: string;
  setPosts: React.Dispatch<React.SetStateAction<Product[]>>;
  posts: Product[];
};

export function DeleteProductDialog({
  id,
  productName,
  setPosts,
  posts,
}: DeleteProductDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8090/api/v1/products/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + getToken(),
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error("An error occurred while deleting the product:", error);
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
            Czy na pewno chcesz usunąć produkt <strong>{productName}</strong>?
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
            onClick={() => deleteProduct(id)}
          >
            Usuń
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
