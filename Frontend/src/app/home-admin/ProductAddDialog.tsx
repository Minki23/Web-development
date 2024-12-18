import { useState } from 'react';
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
import { getToken } from '@/api/auth';
type Product = {
  id: number;
  name: string;
  price: number;
  weight: number;
  category: number;
};

type ProductFormData = {
  name: string;
  price: number;
  weight: number;
  category: number;
};

type AddProductDialogProps = {
  setPosts: React.Dispatch<React.SetStateAction<Product[]>>;
};

type CategorySelectorProps = {
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

export function ProductAddDialog({setPosts}: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    weight: 0,
    category: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addProduct = async () => {
    if (!formData.name || !formData.price || !formData.weight || !formData.category)
      return;
    try{
    const response = await fetch('http://localhost:8090/api/v1/products', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if(response.ok){
      const createdProduct = await response.json();
      setPosts((prev) => [
        ...prev,
        {
          id: createdProduct.id,
          name: createdProduct.name,
          price: Number(createdProduct.price),
          weight: Number(createdProduct.weight),
          category: createdProduct.category,
        },
      ]);
      setOpen(false);
    };
     } catch (error) {
      console.error('There was an error!', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Dodaj produkt</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dodawanie produktu</DialogTitle>
          <DialogDescription>
            Dodaj nowy produkt do listy
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="name" className="text-center flex items-center justify-center">Nazwa produktu</Label>
            <Input
              type="text"
              placeholder="Nazwa produktu"
              id="name"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="price" className="text-center flex items-center justify-center">Cena produktu</Label>
            <Input
              type="number"
              placeholder="Cena produktu"
              id="price"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
          <Label htmlFor="weight" className="text-center flex items-center justify-center">Waga produktu</Label>
            <Input
              type="number"
              placeholder="Waga produktu"
              id="weight"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
          <Label htmlFor="category" className="text-center flex items-center justify-center">Kategoria produktu</Label>
          <div className="w-[193px]">
          <CategorySelector setFormData={setFormData}/>
          </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Zamknij
            </Button>
          </DialogClose>
          <Button type="submit" onClick={addProduct}>
              Dodaj
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
