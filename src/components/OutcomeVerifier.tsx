import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { useState } from 'react';
import { GameOutcome, getProcessor, processors } from '@/processors';
import { getHashFrom } from '@/helpers/crypto';

const MULTI_ROUND_GAMES = ['plinko'];

const formSchema = z.object({
  clientSeed: z.string().min(1, 'Client seed is required'),
  serverSeed: z.string().min(1, 'Server seed is required'),
  serverSeedHash: z.string().min(1, 'Server seed hash is required'),
  nonce: z.string().min(1, 'Nonce is required'),
  gamemode: z.string().min(1, 'Gamemode is required'),
  rounds: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type RoundResult = {
  round: number;
  seed: string;
  outcome: GameOutcome;
};

type VerificationResult = {
  results: RoundResult[];
} | null;

export function OutcomeVerifier() {
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null);
  const [hashVerification, setHashVerification] = useState<{ expectedHash: string; receivedHash: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientSeed: '',
      serverSeed: '',
      serverSeedHash: '',
      nonce: '',
      gamemode: '',
      rounds: '1',
    },
  });

  const selectedGame = form.watch('gamemode');
  const isMultiRoundGame = MULTI_ROUND_GAMES.includes(selectedGame);

  async function onSubmit(values: FormValues) {
    // Verify server seed hash
    const expectedHash = await getHashFrom(values.serverSeed);
    setHashVerification({
      expectedHash,
      receivedHash: values.serverSeedHash,
    });

    const seed = `${values.serverSeed}:${values.clientSeed}:${values.nonce}`;
    const rounds = values.rounds ? parseInt(values.rounds) : 1;
    const processor = getProcessor(values.gamemode);

    const results: RoundResult[] = [];
    if (rounds === 1) {
      const outcome = processor.process(seed);
      results.push({
        round: 1,
        seed: seed,
        outcome,
      });
    } else {
      for (let round = 1; round <= rounds; round++) {
        const roundSeed = `${seed}:${round}`;
        const outcome = processor.process(roundSeed);
        results.push({
          round: round,
          seed: roundSeed,
          outcome,
        });
      }
    }

    setVerificationResult({
      results: results,
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Outcome Verifier</CardTitle>
        <CardDescription>Verify game outcomes using server seed, client seed, and nonce</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="gamemode"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Gamemode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a gamemode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(processors).map((game) => (
                          <SelectItem key={game} value={game}>
                            {game}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isMultiRoundGame && (
                <FormField
                  control={form.control}
                  name="rounds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rounds</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="Enter number of rounds" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="clientSeed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Seed</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter client seed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serverSeed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Seed</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter server seed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nonce"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nonce</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter nonce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="serverSeedHash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Seed (Hashed)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter server seed hash" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </Form>

        {verificationResult && (
          <div className="space-y-6">
            {hashVerification && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-medium">Hash Verification</h3>
                  <Separator className="flex-1" />
                </div>
                <div className="text-xs font-mono space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Expected:</span>
                    <code>{hashVerification.expectedHash}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Received:</span>
                    <code>{hashVerification.receivedHash}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={`font-medium ${
                        hashVerification.expectedHash === hashVerification.receivedHash ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {hashVerification.expectedHash === hashVerification.receivedHash ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-medium">Outcome</h3>
                <Separator className="flex-1" />
              </div>
              <div className="text-xs font-mono space-y-1">
                {verificationResult.results.map((round) => round.outcome.result).join(' ')}
              </div>
            </div>

            {verificationResult.results && verificationResult.results.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-medium">Calculations</h3>
                  <Separator className="flex-1" />
                </div>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2 pr-4">
                    {verificationResult.results.map((round) => (
                      <div key={round.round} className="text-sm p-3 border rounded-lg bg-muted/5">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Round {round.round}</span>
                          <code className="text-xs text-muted-foreground font-mono">{round.seed}</code>
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="text-xs font-mono space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Result:</span>
                              <code>{round.outcome.result}</code>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Value:</span>
                              <code>{round.outcome.value}</code>
                            </div>
                            {round.outcome.metadata &&
                              Object.entries(round.outcome.metadata).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2">
                                  <span className="text-muted-foreground">{key}:</span>
                                  <code>{value}</code>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// const baseSeed = `${values.serverSeed}:${values.clientSeed}:${values.nonce}`;
// // const processor = getOutcomeProcessor(values.gamemode);

// // if (isMultiRoundGame && values.rounds) {
// //   const numRounds = parseInt(values.rounds);
// //   const roundResults: RoundResult[] = [];

// //   for (let i = 0; i < numRounds; i++) {
// //     const roundSeed = `${baseSeed}:${i + 1}`;
// //     const outcome = processor.process(roundSeed);

// //     roundResults.push({
// //       roundNumber: i + 1,
// //       seed: roundSeed,
// //       outcome,
// //     });
// //   }

// //   setVerificationResult({
// //     gameName: values.gamemode,
// //     clientSeed: values.clientSeed,
// //     serverSeed: values.serverSeed,
// //     nonce: values.nonce,
// //     finalOutcome: roundResults[roundResults.length - 1].outcome,
// //     rounds: roundResults,
// //   });
// // } else {
// //   const outcome = processRound(values.gamemode, baseSeed);
// //   setVerificationResult({
// //     gameName: values.gamemode,
// //     clientSeed: values.clientSeed,
// //     serverSeed: values.serverSeed,
// //     nonce: values.nonce,
// //     finalOutcome: outcome,
// //   });
// // }
