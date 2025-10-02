import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`font-headline text-2xl font-bold text-primary ${className}`}>
      <a href="/">Agrocraft Online</a>
    </div>
  );
};

export default Logo;
