'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Construction } from 'lucide-react';

const NOTICE_DISMISSED_KEY = 'devNoticeDismissed';

export function DevelopmentNotice() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasBeenDismissed = sessionStorage.getItem(NOTICE_DISMISSED_KEY);

    if (!hasBeenDismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(NOTICE_DISMISSED_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Construction className="h-6 w-6 text-primary" />
            Website Under Development
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-4">
            Welcome to Agrocraft Ventures! Please note that our website is currently under active development. Some features may not be fully functional.
            <br /><br />
            We appreciate your patience and deeply regret any inconvenience.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleDismiss}>I Understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
