import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useState } from 'react';
import { OutcomeVerifierResult } from './OutcomeVerifierResult';
import { OutcomeVerifierForm } from './OutcomeVerifierForm';
import { VerificationResult } from '@/types';

export function OutcomeVerifier() {
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Outcome Verifier</CardTitle>
        <CardDescription>
          Verify the outcome of a game using the server seed, client seed, and nonce. By providing the server seed hash, you can verify
          that the outcome has not been tampered with.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OutcomeVerifierForm onVerificationChange={setVerificationResult} />
        {verificationResult && <OutcomeVerifierResult verificationResult={verificationResult} />}
      </CardContent>
    </Card>
  );
}
