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
import { getToken } from "@/api/auth"

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

type EditProductDialogProps = {
  id: number;
  productName: string;
  productPrice: number;
  productCategory: number;
  productWeight: number;
  setPosts: React.Dispatch<React.SetStateAction<Product[]>>;
  posts: Product[];
};

type CategorySelectorProps = {
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

export function ProductEditDialog({
  id,
  productName,
  productPrice,
  productCategory,
  productWeight,
  setPosts
}: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: productName,
    price: productPrice,
    weight: productWeight,
    category: productCategory,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const editProduct = async () => {
    if (!formData.name || !formData.price || !formData.weight || !formData.category)
      return;
    try{
      if(typeof(formData.category)==="string"){
        const category = formData.category;
        const response = await fetch(`http://localhost:8090/api/v1/categories`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: category}),
        })
        if(response.ok){
          const newCategory = await response.json();
          formData.category = newCategory.id;
        }

      }
    const response = await fetch(`http://localhost:8090/api/v1/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if(response.ok){
      const updatedProduct = await response.json();
      setPosts((prev) =>
        prev.map((post) =>
          post.id === updatedProduct.id
            ? {
                id: updatedProduct.id,
                name: updatedProduct.name,
                price: Number(updatedProduct.price),
                weight: Number(updatedProduct.weight),
                category: updatedProduct.category,
              }
            : post
        )
      );
      setOpen(false);
    };
     } catch (error) {
      console.error('There was an error!', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger asChild>
        <Button variant="default">Edytuj</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edycja produktu</DialogTitle>
          <DialogDescription>
           Edytuj produkt z listy
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="name" className="text-center flex items-center justify-center">Nazwa produktu</Label>
            <Input
              type="text"
              placeholder="Nazwa produktu"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="price" className="text-center flex items-center justify-center">Cena produktu</Label>
            <Input
              type="number"
              placeholder="Cena produktu"
              id="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
          <Label htmlFor="weight" className="text-center flex items-center justify-center">Waga produktu</Label>
            <Input
              type="number"
              placeholder="Waga produktu"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
          <Label htmlFor="category" className="text-center flex items-center justify-center">Kategoria produktu</Label>
          <div className="w-[193px]">
          <CategorySelector value={formData.category} setFormData={setFormData}/>
          </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Zamknij
            </Button>
          </DialogClose>
          <Button type="submit" onClick={editProduct}>
              Dodaj
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default ProductEditDialog;
