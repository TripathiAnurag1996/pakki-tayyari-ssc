import { signup } from '../login/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams.error

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[#050505]">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-violet-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 w-full max-w-md animate-in-fade">
        <div className="text-center mb-8">
           <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2">
            Pakki<span className="text-primary text-glow">Tayyari</span>
          </h1>
          <p className="text-zinc-500 font-medium">Join the Elite League of Aspirants</p>
        </div>

        <Card className="glass border-0 ring-1 ring-white/10 shadow-2xl overflow-hidden">
          <CardHeader className="space-y-2 text-center pb-8 pt-10">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">Create Account</CardTitle>
            <CardDescription className="text-zinc-400">
              Initialize your journey toward exam mastery
            </CardDescription>
          </CardHeader>
          <form action={signup}>
            <CardContent className="space-y-6">
              {error && (
                <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl p-4 text-sm text-center font-medium animate-bounce">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-300 ml-1">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300 ml-1">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" title="Password" className="text-zinc-300 ml-1">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-6 pt-6 pb-10">
              <Button type="submit" className="w-full h-12 text-base font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-[1.02] transition-transform">
                Begin Mastery
              </Button>
              <div className="text-center text-sm text-zinc-500">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-white hover:text-primary transition-colors">
                  Sign In
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
