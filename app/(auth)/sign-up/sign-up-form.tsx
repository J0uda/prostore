'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { signUpDefaultValues } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { signUpUser } from '@/lib/actions/user.actions';

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Submitting' : 'Sign Up'}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            type='text'
            autoComplete='name'
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='confirmPassword'
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}
        <div>
          <SignUpButton />
        </div>
        <div className='text-sm text-center text-muted-foreground'>
          Already have an account?{' '}
          <Link href='/sign-in' className='link' target='_self'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;