
import { useState } from 'react';
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
import { Label } from "@/components/ui/label"
import { getToken } from "@/api/auth"

type ProductFormData = {
  name: string;
  price: number;
  weight: number;
  category: number;
};

type ProductDetailsDialogProps = {
  id: number;
};

function ProductDetailsDialog({id}: ProductDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    weight: 0,
    category: 0,
  });

  const viewProduct = async () => {
    try{
      const response = await fetch(`http://localhost:8090/api/v1/products/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + getToken(),
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){
        const data = await response.json();
        setFormData(data);
      };
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
  
  if(open){
    viewProduct();
  }

return (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="default">Szczegóły</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Szczegóły produktu</DialogTitle>
        <DialogDescription>
          Szzcegóły jednego produktu do listy
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center flex-col gap-y-4">
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="name" className="text-center flex items-center justify-center">Nazwa produktu: {formData.name}</Label>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="price" className="text-center flex items-center justify-center">Cena produktu: {formData.price} zł</Label>
        </div>
        <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="weight" className="text-center flex items-center justify-center">Waga produktu: {formData.weight} g</Label>
        </div>
        <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="category" className="text-center flex items-center justify-center">Kategoria produktu: {formData.category}</Label>
        
        </div>
      </div>
      <DialogFooter className="sm:justify-between ">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Zamknij
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
}
export default ProductDetailsDialog;
