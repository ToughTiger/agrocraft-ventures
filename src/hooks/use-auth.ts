'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';

function getCookie(name: string): string | undefined {
    if (typeof document === 'undefined') {
        return undefined;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}


export function useAuth() {
  const { toast } = useToast();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check for auth token on initial load
    const token = getCookie('auth_token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        setLoggedIn(false);
        toast({
          title: 'Logged Out',
          description: 'You have been successfully logged out.',
        });
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'Something went wrong during logout.',
      });
    }
  }, [toast]);

  return { loggedIn, logout };
}
