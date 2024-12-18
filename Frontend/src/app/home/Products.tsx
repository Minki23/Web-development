"use client";
import React, { useState } from 'react';
import { useEffect } from 'react';
import ProductDetailsDialog from "./ProductDetailsDialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import { getToken } from '@/api/auth';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface Product {
  id: number;
  name: string;
  weight: number;
  price: number;
  category: number;
}

function Product(){

  const router = useRouter()
  const [loading, setLoading] = useState(false); 
  const [posts, setPosts] = useState<Product[]>([]); 
  const [visible, setVisible] = useState(false); 
  const [itemName, setItemName] = useState(""); 

useEffect(() => { 
  const loadPost = async () => { 
      setLoading(true); 
      console.log('Bearer ' + getToken());
      const response  = await fetch('http://localhost:8090/api/v1/products',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + getToken(),
          'Content-Type': 'application/json',
        }
      }
      );
      console.log(response + "response");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      json.sort((a: Product, b: Product) => a.id - b.id);
      setPosts(json); 
      setLoading(false); 
  }; 
    loadPost();
  }, [])

  const showAlert = (item:string)=>{
    setItemName(item)
    setVisible(true)
    setTimeout(() => setVisible(false), 2000);
  }

  const addToCart = (id: number, name: string, quantity: number = 1) => {
    const cookieName = "cart";
  
    const getCart = () => {
      const cookies = document.cookie.split("; ");
      const cartCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
      return cartCookie ? JSON.parse(decodeURIComponent(cartCookie.split("=")[1])) : [];
    };
  
    const cart = getCart();
  
    const existingItem = cart.find((item: { id: number; quantity: number }) => item.id === id);
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id, quantity });
    }
  
    const saveCart = (cart: { id: number; quantity: number }[]) => {
      document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=${60 * 60 * 24 * 7}`;
    };
  
    saveCart(cart);
    console.log(`Item ${id} added to cart with quantity ${quantity}`, cart);
    showAlert(name)
  };


  return (
  <>
    {loading ? ( 
              <h4 className='text-center'>Loading...</h4> 
          ) : ( 
          <>
          <Button onClick={() => {router.push("/home/cart")}} variant="default">Zobacz koszyk</Button>
          <Table>
            <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nazwa</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead>Waga</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead className='text-center'>Akcja</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {
              posts.map((post) => ( 
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell> 
                  <TableCell>{post.name}</TableCell>
                  <TableCell>{post.price}</TableCell>
                  <TableCell>{post.weight}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell className='flex justify-between'>
                  <Button onClick={() => addToCart(post.id, post.name)}>Dodaj</Button>
                  <ProductDetailsDialog id={post.id}/>
                  </TableCell>
                </TableRow>
              ))
              }
          </TableBody>
          </Table>
          <Alert className={`absolute top-28 left-0 right-0 ml-auto mr-auto w-1/4 ${visible ? "opacity-100" : 'opacity-0 pointer-events-none'}`}>
            <AlertTitle>Dodano</AlertTitle>
            <AlertDescription>
              Item added to cart
            </AlertDescription>
          </Alert>
          </>
      )}
  </>
  )
}
export default Product;