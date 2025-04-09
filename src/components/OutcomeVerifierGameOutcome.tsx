import { Separator } from './ui/separator';
import { ReactNode } from 'react';

export const OutcomeVerifierGameOutcome = ({ node }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-medium">Outcome</h3>
        <Separator className="flex-1" />
      </div>
      <div className="text-xs font-mono space-y-1">{node}</div>
    </div>
  );
};

type Props = {
  node: ReactNode;
};
