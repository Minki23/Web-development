import { Copy } from "lucide-react"
import { useEffect, useState } from 'react';
import CategorySelector  from "./CategorySelector"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getToken } from "@/api/auth"

type Category = {
  id: number;
  name: string;
  code: string;
};

type ProductFormData = {
  name: string;
  code: string;
};

type EditCategoryDialogProps = {
  id: number;
  categoryName: string;
  categoryCode: string;
  setPosts: React.Dispatch<React.SetStateAction<Category[]>>;
  posts: Category[];
};

export function CategoryEditDialog({id, categoryName, categoryCode , posts, setPosts}: EditCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: categoryName,
    code: categoryCode
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addCategory = async () => {
    if (!formData.name || !formData.code)
      return;
    try{
    const response = await fetch(`http://localhost:8090/api/v1/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if(response.ok){
      const updatedCategory = await response.json();
      setPosts((prev) => 
        prev.map((post) => 
          (post.id === updatedCategory.id ? 
            {
              id: updatedCategory.id,
              name: updatedCategory.name,
              code: updatedCategory.code
            } : post)));
      setOpen(false);
    };
     } catch (error) {
      console.error('There was an error!', error);
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="default">Edytuj</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dodawanie kategorii</DialogTitle>
          <DialogDescription>
            Dodaj nową kategorię do listy
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="name" className="text-center flex items-center justify-center">Nazwa kategorii</Label>
            <Input
              type="text"
              placeholder="Nazwa kategorii"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="code" className="text-center flex items-center justify-center">Kod kategorii</Label>
            <Input
              type="text"
              placeholder="Kod kategorii"
              id="code"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Zamknij
            </Button>
          </DialogClose>
          <Button type="submit" onClick={addCategory}>
              Dodaj
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default CategoryEditDialog
