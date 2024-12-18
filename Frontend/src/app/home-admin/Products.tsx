"use client";
import React, { useState } from 'react';
import { useEffect } from 'react';
import ProductDetailsDialog from "./ProductDetailsDialog"
import { ProductAddDialog } from "./ProductAddDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";
import { ProductEditDialog } from "./ProductEditDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getToken } from '@/api/auth';
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
useEffect(() => { 
  const loadPost = async () => { 
      setLoading(true); 
      const response  = await fetch('http://localhost:8090/api/v1/products',
        {
          method: 'GET',
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
      setLoading(false); 
  }; 
    loadPost();
  }, [])

  return (
  <>
    {loading ? ( 
              <h4 className='text-center'>Loading...</h4> 
          ) : ( 
          <>
            <div className='flex justify-between'>
              <h1 className="text-lg inline">Lista produktów</h1> <ProductAddDialog setPosts={setPosts}/>
            </div>
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
                  <DeleteProductDialog
                      id={post.id}
                      productName={post.name}
                      setPosts={setPosts}
                      posts={posts}
                    />
                    <ProductEditDialog
                      id={post.id}
                      productName={post.name}
                      productPrice={post.price}
                      productWeight={post.weight}
                      productCategory={post.category}
                      setPosts={setPosts}
                      posts={posts}
                    />
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