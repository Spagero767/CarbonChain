import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-headline text-xl font-semibold text-primary">
      <Leaf className="h-6 w-6" />
      <span className="font-bold">CarbonChain</span>
    </div>
  );
}
