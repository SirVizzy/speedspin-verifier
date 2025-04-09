import { Separator } from './ui/separator';

export const OutcomeVerifierHashVerification = ({ expectedHash, receivedHash }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-medium">Hash Verification</h3>
        <Separator className="flex-1" />
      </div>
      <div className="text-xs font-mono space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Expected:</span>
          <code>{expectedHash}</code>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Received:</span>
          <code>{receivedHash}</code>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Status:</span>
          <span className={`font-medium ${expectedHash === receivedHash ? 'text-green-500' : 'text-red-500'}`}>
            {expectedHash === receivedHash ? 'Valid' : 'Invalid'}
          </span>
        </div>
      </div>
    </div>
  );
};

type Props = {
  expectedHash: string;
  receivedHash: string;
};
