import React from 'react';
import Link from 'next/link';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={className}>
      <svg width="180" height="90" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(100,20)">
          <path d="M50 100 Q0 50 50 0 Q100 50 50 100 Q100 150 50 100 Q0 150 50 100" fill="hsl(var(--primary))" />
          <path d="M30 100 Q-20 60 30 20 Q80 60 30 100" fill="hsl(var(--primary) / 0.7)" />
          <path d="M70 100 Q120 60 70 20 Q20 60 70 100" fill="hsl(var(--primary) / 0.7)" />
        </g>
        <text x="200" y="140" fontFamily="Montserrat" fontSize="24" fill="hsl(var(--primary))" textAnchor="middle">Agrocraft Ventures</text>
        <text x="200" y="170" fontFamily="Montserrat" fontSize="16" fill="hsl(var(--primary))" textAnchor="middle">Harvesting Innovation</text>
      </svg>
    </Link>
  );
};

export default Logo;
