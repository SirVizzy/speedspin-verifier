import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { GameOutcomeStep } from '@/types';
import { OutcomeVerifierGameStep } from './OutcomeVerifierGameStep';

export const OutcomeVerifierGameSteps = ({ steps }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-medium">Steps</h3>
        <Separator className="flex-1" />
      </div>
      <ScrollArea className="h-[300px]">
        <div className="space-y-2 pr-4">
          {steps.map((step, index) => (
            <OutcomeVerifierGameStep key={index} step={step} index={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

type Props = {
  steps: GameOutcomeStep[];
};
