import { XCircle, CheckCircle2 } from 'lucide-react';
import { HashVerification } from './HashVerifier';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export const HashVerifierResult = ({ verification }: Props) => {
  if (!verification) {
    return null;
  }

  const isValid = verification.expectedHash.toLowerCase() === verification.receivedHash.toLowerCase();

  return (
    <Alert variant={isValid ? 'default' : 'destructive'}>
      {isValid ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
      <AlertTitle>{isValid ? 'Verified' : 'Mismatch'}</AlertTitle>
      <AlertDescription className="space-y-2">
        {isValid ? (
          <p>The provided server seed matches its hash.</p>
        ) : (
          <>
            <div className="text-xs font-mono space-y-1">
              <p>
                Expected:
                <br /> {verification.expectedHash}
              </p>
              <p>
                Received:
                <br /> {verification.receivedHash}
              </p>
            </div>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
};

type Props = {
  verification: HashVerification;
};
