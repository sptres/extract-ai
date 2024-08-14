'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  // Perform the TRPC query
  const { data, error, isLoading } = trpc.authCallback.useQuery();

  // Use useEffect to handle side effects like navigation
  useEffect(() => {
    if (data?.success) {
      router.push(origin ? `/${origin}` : '/dashboard');
    } else if (error?.data?.code === 'UNAUTHORIZED') {
      router.push('/sign-in');
    }
  }, [data, error, router, origin]);

  if (isLoading) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="font-semibold text-xl">Setting up your account...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    );
  }

  return null; // or some fallback UI if necessary
};

export default Page;
