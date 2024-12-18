"use client";
import React, { useEffect, useState } from 'react';
import { getToken } from '../../api/auth';
interface User {
  id: number;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const getUsers = async () => {
      const accessToken = getToken();
      console.log('Access Token:', accessToken);

      try {
        const response = await fetch('http://localhost:8090/api/v1/products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          console.log('Response:', response);
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Data:', data);
        setUsers(data); // Zapisz dane użytkowników w stanie
        setLoading(false); // Ustaw stan ładowania na false po zakończeniu
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          setError(error.message); // Ustaw błąd, jeśli nie jest to błąd anulowania
        }
        setLoading(false);
      }
    };

    getUsers();

    // Funkcja cleanup: Anulowanie żądania w przypadku unmount komponentu
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        !loading && <p>No users found</p>
      )}
    </div>
  );
};

export default Users;
