import * as React from 'react';

import { cn } from '../../lib/utils';

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.68))] shadow-[0_18px_50px_rgba(2,6,23,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%)] before:opacity-100 before:content-[""] after:absolute after:inset-x-4 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('relative flex flex-col gap-1.5 p-6', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('relative text-xl font-semibold tracking-tight text-white', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('relative text-sm leading-6 text-white/65', className)} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('relative p-6 pt-0', className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
