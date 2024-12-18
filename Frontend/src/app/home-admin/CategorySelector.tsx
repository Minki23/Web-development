import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Product from './Products';
import { getToken } from "@/api/auth"
import { SelectLabel } from '@radix-ui/react-select';

type ProductFormData = {
  name: string;
  price: number;
  weight: number;
  category: number;
};

interface Category {
  id: number;
  name: string;
  code: string;
}

type CategorySelectorProps = {
  value?: number;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

function CategorySelector({ value, setFormData }: CategorySelectorProps) {
  const [loading, setLoading] = useState(false); 
  const [data, setData] = useState<Category[]>([]); 


  useEffect(() => { 
    const loadPost = async () => { 
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8090/api/v1/categories',
          {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + getToken(),
              'Content-Type': 'application/json',
            }
          });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }; 
    loadPost();
  }, [])

  const handleChange = (value: string) =>{
    const selectedCategory = data.find((category) => category.id === parseInt(value));
    setFormData((prev) => ({ ...prev, category: selectedCategory ? selectedCategory.id : 0 }));
  }
  return (
  <Select onValueChange={handleChange}>
    <SelectTrigger>
      <SelectValue placeholder="Kategoria"/>
    </SelectTrigger>
    <SelectContent>
    {data.map((category: any) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name} {category.code}
              </SelectItem>
          ))}
    </SelectContent>
  </Select>   
  );
}
export default CategorySelector;