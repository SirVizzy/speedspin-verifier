import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useState } from 'react';
import { getHashFrom } from '@/helpers/crypto';
import { HashVerifierResult } from './HashVerifierResult';

const formSchema = z.object({
  serverSeed: z.string().min(1, 'Server seed is required'),
  serverSeedHash: z.string().min(1, 'Server seed hash is required'),
});

type FormValues = z.infer<typeof formSchema>;

export type HashVerification = {
  expectedHash: string;
  receivedHash: string;
} | null;

export function HashVerifier() {
  const [verification, setVerification] = useState<HashVerification>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverSeed: '',
      serverSeedHash: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const expectedHash = await getHashFrom(values.serverSeed);
    setVerification({
      expectedHash: expectedHash,
      receivedHash: values.serverSeedHash,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hash Verifier</CardTitle>
        <CardDescription>
          Verify if the server seed matches the provided hash. This is useful for verifying the integrity of the server seed to ensure
          that it is not tampered with.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              Verify Hash
            </Button>
          </form>
        </Form>

        {verification && <HashVerifierResult verification={verification} />}
      </CardContent>
    </Card>
  );
}
