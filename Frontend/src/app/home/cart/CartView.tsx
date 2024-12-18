"use client";
import React, { useState } from 'react';
import { useEffect } from 'react';
import ProductDetailsDialog from ".././ProductDetailsDialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import { getToken } from "@/api/auth"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

interface CartItem{
  id: number;
  quantity: number;
  name: string;
  weight: number;
  price: number;
  category: number;
}

interface Product {
  id: number;
  name: string;
  weight: number;
  price: number;
  category: number;
}

function Product(){
const [loading, setLoading] = useState(false); 
const [posts, setPosts] = useState<Product[]>([]); 
const [cartItems, setCartItems] = useState<CartItem[]>([])
const router = useRouter()

useEffect(() => { 
  const loadPost = async () => { 
      setLoading(true); 
      const response  = await fetch('http://localhost:8090/api/v1/products',{
        headers: {
          'Authorization': 'Bearer ' + getToken(),
          'Content-Type': 'application/json',
        }
      }
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      json.sort((a: Product, b: Product) => a.id - b.id);
      setPosts(json);
      setLoading(false) 
  }; 
    loadPost();
  }, [])

  const cookieName = "cart";
  const getCart = () => {
    const cookies = document.cookie.split("; ");
    const cartCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
    return cartCookie ? JSON.parse(decodeURIComponent(cartCookie.split("=")[1])) : [];
  };

  const updateCart = (id: number, quantity: number) => {
  
    const saveCart = (cart: { id: number; quantity: number }[]) => {
      document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=${60 * 60 * 24 * 7}`;

    };
  
    const cart = getCart();
  
    const existingItemIndex = cart.findIndex((item: { id: number; quantity: number }) => item.id === id);
  
    if (existingItemIndex > -1) {
      if (quantity > 0) {
        cart[existingItemIndex].quantity = quantity;
      } else {
        cart.splice(existingItemIndex, 1);
      }
    } else if (quantity > 0) {
      cart.push({ id, quantity });
    }
  
    saveCart(cart);
  };

  const removeFromCart = (id: number) => {
    const cart = getCart();
  
    const updatedCart = cart.filter((item: CartItem) => item.id !== id);
  
    document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(updatedCart))}; path=/; max-age=${60 * 60 * 24 * 7}`;
  };

  const cart = getCart().map((item: { id: number; quantity: number }) => {
    const product = posts.find((post) => post.id === item.id);
    if (product) {
      return {
        ...product,
        quantity: item.quantity,
      };
    }
    return null;
  }).filter((item: CartItem | null) => item !== null) as CartItem[];

  return (
  <>
    {loading ? ( 
              <h4 className='text-center'>Loading...</h4> 
          ) : ( 
          <>
          <Button onClick={() => {router.back()}}>Powrót</Button>
          <Table>
            <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nazwa</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead>Waga</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead>Ilość</TableHead>
              <TableHead className='text-center'>Akcja</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {
              cart.map((post: CartItem) => ( 
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell> 
                  <TableCell>{post.name}</TableCell>
                  <TableCell>{post.price}</TableCell>
                  <TableCell>{post.weight}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                  <Input
                    name="quantity"
                    id="quantity"
                    type="number"
                    min="1"
                    defaultValue={post.quantity}
                    className="w-20"
                    onChange={(e) => {updateCart(post.id, parseInt(e.target.value)) }}
                  />
                  </TableCell>
                  <TableCell className='w-0'>
                    <Button className='w-[100%] mb-1' variant="destructive" onClick={()=>{removeFromCart(post.id)}}> Usuń </Button>
                    <ProductDetailsDialog id={post.id}/>
                  </TableCell>
                </TableRow>
              ))
              }
          </TableBody>
          </Table>
          </>
      )}
  </>
  )
}
export default Product;