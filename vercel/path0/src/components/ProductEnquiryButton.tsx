'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/EnquiryForm';
import type { Product } from '@/lib/types';

export function ProductEnquiryButton({ product }: { product: Product }) {
    const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);
    return (
        <>
            <Button size="lg" onClick={() => setIsEnquiryFormOpen(true)}>Price on request</Button>
            <EnquiryForm 
                product={product}
                open={isEnquiryFormOpen}
                onOpenChange={setIsEnquiryFormOpen}
            />
        </>
    );
}
