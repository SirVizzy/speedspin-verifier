import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { GameOutcome } from '@/processors';

export type RoundResult = {
  roundNumber: number;
  seed: string;
  outcome: GameOutcome;
};

export type OutcomeVerification = {
  gameName: string;
  clientSeed: string;
  serverSeed: string;
  nonce: string;
  rounds: RoundResult[];
} | null;

export const OutcomeVerifierResult = ({ verification }: { verification: OutcomeVerification }) => {
  if (!verification) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Verification Complete</AlertTitle>
        <AlertDescription>
          Results for {verification.rounds.length} rounds of {verification.gameName}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Game Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs font-mono space-y-1">
            <p>Client Seed: {verification.clientSeed}</p>
            <p>Server Seed: {verification.serverSeed}</p>
            <p>Nonce: {verification.nonce}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Round Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {verification.rounds.map((round) => (
                <Card key={round.roundNumber} className="border-dashed">
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">Round {round.roundNumber}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs font-mono space-y-1 py-2">
                    <p>Seed: {round.seed}</p>
                    <p>Outcome: {round.outcome.value}</p>
                    {round.outcome.metadata && (
                      <div className="pt-1">
                        {Object.entries(round.outcome.metadata).map(([key, value]) => (
                          <p key={key}>
                            {key}: {JSON.stringify(value)}
                          </p>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
