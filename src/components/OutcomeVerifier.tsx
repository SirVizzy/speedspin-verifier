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
import { GameOutcome, games, GameMode } from '@/processors';
import { getHashFrom } from '@/helpers/crypto';
import { baseSchema } from './baseSchema';
import { mines } from '@/games/mines';
import { blackjack } from '@/games/blackjack';
import { roulette } from '@/games/roulette';
import { dice } from '@/games/dice';
import { plinko } from '@/games/plinko';

const createSchema = () => {
  return z.discriminatedUnion('gamemode', [
    baseSchema.extend({
      gamemode: z.literal('plinko'),
      options: plinko.schema,
    }),
    baseSchema.extend({
      gamemode: z.literal('mines'),
      options: mines.schema,
    }),
    baseSchema.extend({
      gamemode: z.literal('blackjack'),
      options: blackjack.schema,
    }),
    baseSchema.extend({
      gamemode: z.literal('roulette'),
      options: roulette.schema,
    }),
    baseSchema.extend({
      gamemode: z.literal('dice'),
      options: dice.schema,
    }),
  ]);
};

const schema = createSchema();

type Schema = z.infer<typeof schema>;

export function OutcomeVerifier() {
  const [verificationResult, setVerificationResult] = useState<GameOutcome | null>(null);
  const [hashVerification, setHashVerification] = useState<{ expectedHash: string; receivedHash: string } | null>(null);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const selectedGame = form.watch('gamemode') as GameMode;

  async function onSubmit(values: Schema) {
    // Verify server seed hash
    const expectedHash = await getHashFrom(values.serverSeed);
    setHashVerification({
      expectedHash,
      receivedHash: values.serverSeedHash,
    });

    const seed = `${values.serverSeed}:${values.clientSeed}:${values.nonce}`;
    const game = games[values.gamemode];

    setVerificationResult(game.process(seed, values.options as never));
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
                        {Object.keys(games).map((game) => (
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
            </div>

            {/* Game-specific options */}
            {selectedGame === 'mines' && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="options.size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grid Size</FormLabel>
                      <FormControl>
                        <Input type="number" min="3" max="10" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="options.mines"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Mines</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="25" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {selectedGame === 'plinko' && (
              <FormField
                control={form.control}
                name="options.rows"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Rows</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="10" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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

              {/* todo: render */}
              <div className="text-xs font-mono space-y-1">
                {verificationResult.result} {verificationResult.raw}
              </div>
            </div>

            {verificationResult.steps && verificationResult.steps.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-medium">Steps</h3>
                  <Separator className="flex-1" />
                </div>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2 pr-4">
                    {verificationResult.steps.map((step, index) => (
                      <div key={index} className="text-sm p-3 border rounded-lg bg-muted/5">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Step {index + 1}</span>
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
