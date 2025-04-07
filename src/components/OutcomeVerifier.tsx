import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const formSchema = z.object({
  clientSeed: z.string().min(1, 'Client seed is required'),
  serverSeed: z.string().min(1, 'Server seed is required'),
  nonce: z.string().min(1, 'Nonce is required'),
  gamemode: z.string().min(1, 'Gamemode is required'),
  rounds: z.string().min(1, 'Rounds is required'),
});

type FormValues = z.infer<typeof formSchema>;

export function OutcomeVerifier() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientSeed: '',
      serverSeed: '',
      nonce: '',
      gamemode: '',
      rounds: '',
    },
  });

  function onSubmit(values: FormValues) {
    console.log('Outcome Verification:', values);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Outcome Verifier</CardTitle>
        <CardDescription>Verify game outcomes using server seed, client seed, and nonce.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Seeds Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            {/* Game Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gamemode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gamemode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gamemode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dice">Dice</SelectItem>
                        <SelectItem value="roulette">Roulette</SelectItem>
                        <SelectItem value="slots">Slots</SelectItem>
                      </SelectContent>
                    </Select>
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

            {/* Verification Settings */}
            <FormField
              control={form.control}
              name="rounds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rounds</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter number of rounds" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Verify Outcome
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
