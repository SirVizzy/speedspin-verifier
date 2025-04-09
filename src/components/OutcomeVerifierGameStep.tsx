import { GameOutcomeStep } from '@/types';

type Props = {
  step: GameOutcomeStep;
  index: number;
};

export const OutcomeVerifierGameStep = ({ step, index }: Props) => {
  return (
    <div className="text-sm p-3 border rounded-lg bg-muted/5">
      <div className="flex items-center justify-between">
        <span className="font-medium">
          {step.title} {index + 1}
        </span>
        {step.seed && <code className="text-xs text-muted-foreground font-mono">{step.seed}</code>}
      </div>
      <div className="mt-2 space-y-1">
        <div className="text-xs font-mono space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">raw:</span>
            <code>{step.raw}</code>
          </div>
          {step.metadata &&
            Object.entries(step.metadata).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-muted-foreground">{key}:</span>
                <code>{value}</code>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
