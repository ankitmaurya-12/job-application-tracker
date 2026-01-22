"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {useState} from "react";

import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/auth-client";

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSignIn(e:React.FormEvent){
    e.preventDefault();
    
    setError("");
    setLoading("true");
    
    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(
          result.error.message || "Failed to sign in. Please try again."
        );
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Error signing in. Please try again.");
    } finally {
      setLoading("false");
    }

  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md shadow-lg border-gray-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credential to access account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn} className="space-y-4">
          <CardContent className="space-y-4">
            
          {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jhon@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                minLength={8}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
             {loading ? "Verifying Credential ...":"Sign In"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account ?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
