"use client";
import React, { useState } from 'react'; 
import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CategoryEditDialog } from './CategoryEditDialog';
import { Button } from "@/components/ui/button"
import { CategoryAddDialog } from './CategoryAddDialog';
import { Delete } from 'lucide-react';
import { DeleteCategoryDialog } from './DeleteCategoryDialog';
import { getToken } from '@/api/auth';


interface Category {
  id: number;
  name: string;
  code: string;
}

function Product(){
  const [loading, setLoading] = useState(false); 
  const [posts, setPosts] = useState<Category[]>([]); 
  useEffect(() => { 
  const loadPost = async () => { 
      setLoading(true); 
      const response  = await fetch('http://localhost:8090/api/v1/categories',
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
      setPosts(json); 
      setLoading(false); 
      json.sort((a: Category, b: Category) => a.id - b.id);
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
              <h1 className="text-lg inline">Lista kategorii</h1> <CategoryAddDialog setPosts={setPosts}/>
            </div>
          <Table>
            <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nazwa</TableHead>
              <TableHead>Kod</TableHead>
              <TableHead className='text-right'>Akcja</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {
              posts.map((post) => ( 
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell> 
                  <TableCell>{post.name}</TableCell>
                  <TableCell>{post.code}</TableCell>
                  <TableCell className='flex justify-end'>
                    <DeleteCategoryDialog id={post.id} categoryName={post.name} setPosts={setPosts} posts={posts}/>
                  </TableCell>
                  <TableCell>
                    <CategoryEditDialog id={post.id} categoryName={post.name} categoryCode={post.code} setPosts={setPosts} posts={posts}/>
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