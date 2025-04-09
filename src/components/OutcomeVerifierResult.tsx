import { OutcomeVerifierHashVerification } from './OutcomeVerifierHashVerification';
import { OutcomeVerifierGameOutcome } from './OutcomeVerifierGameOutcome';
import { OutcomeVerifierGameSteps } from './OutcomeVerifierGameSteps';
import { VerificationResult } from '@/types';

export const OutcomeVerifierResult = ({ verificationResult }: Props) => {
  return (
    <div className="space-y-6">
      <OutcomeVerifierHashVerification expectedHash={verificationResult.expectedHash} receivedHash={verificationResult.receivedHash} />
      <OutcomeVerifierGameOutcome node={verificationResult.node} />
      {verificationResult.result.steps && <OutcomeVerifierGameSteps steps={verificationResult.result.steps} />}
    </div>
  );
};

type Props = {
  verificationResult: VerificationResult;
};
