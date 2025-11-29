'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mountain, Loader2 } from 'lucide-react';
import { useAuth, useUser, useFirestore } from '@/firebase';
import {
  initiateEmailSignIn,
  initiateEmailSignUp,
} from '@/firebase/non-blocking-login';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUmkmProfileForUser } from '@/firebase/firestore/data';


const loginSchema = z.object({
  email: z.string().email('Email tidak valid.'),
  password: z.string().min(6, 'Password minimal 6 karakter.'),
});

const registerSchema = z.object({
  umkmName: z.string().min(3, 'Nama UMKM minimal 3 karakter.'),
  email: z.string().email('Email tidak valid.'),
  password: z.string().min(6, 'Password minimal 6 karakter.'),
});

type AuthFormProps = {
  type: 'login' | 'register';
};

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = type === 'login' ? loginSchema : registerSchema;
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === 'login'
        ? {
            email: '',
            password: '',
          }
        : {
            umkmName: '',
            email: '',
            password: '',
          },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        if (type === 'register' && 'umkmName' in form.getValues()) {
            const values = form.getValues() as z.infer<typeof registerSchema>;
            await createUmkmProfileForUser(firestore, firebaseUser, values.umkmName);
        }
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [auth, firestore, router, type, form]);


  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      if (type === 'login') {
        await initiateEmailSignIn(auth, values.email, values.password);
      } else if (type === 'register' && 'umkmName' in values) {
        await initiateEmailSignUp(auth, values.email, values.password);
      }
      toast({
        title: 'Mohon tunggu...',
        description: 'Anda akan segera dialihkan.',
      });
    } catch (error: any) {
      setIsSubmitting(false);
      toast({
        variant: 'destructive',
        title: 'Autentikasi Gagal',
        description: error.message || 'Terjadi kesalahan tak terduga.',
      });
    }
  };
  
  if(isUserLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
       <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="">UMKM Boost</span>
          </Link>
        </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {type === 'login' ? 'Login' : 'Buat Akun'}
          </CardTitle>
          <CardDescription>
            {type === 'login'
              ? 'Masukkan email Anda untuk login ke akun Anda.'
              : 'Masukkan detail Anda untuk membuat akun baru.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               {type === 'register' && (
                <FormField
                  control={form.control}
                  name="umkmName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Usaha (UMKM)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="cth. Kopi Kenangan Senja"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nama@contoh.com"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {type === 'login' ? 'Login' : 'Buat Akun'}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {type === 'login'
              ? 'Belum punya akun? '
              : 'Sudah punya akun? '}
            <Link
              href={type === 'login' ? '/register' : '/login'}
              className="underline"
            >
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
