import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../compoments/ui/button";
import { Input } from "../../compoments/ui/input";
import { Label } from "../../compoments/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../compoments/ui/card";
import { Alert, AlertDescription } from "../../compoments/ui/alert";
import { Loader2, PawPrint } from "lucide-react";
import useAuth from "../../compoments/hooks/useAuth"; // TypeScript version!

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useAuth();
  const login = auth?.login;
  const loading = auth?.loading;
  const authError = auth?.error;
  const [formError, setFormError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("Please enter both email and password.");
      return;
    }

    setFormError("");

    try {
      if (login) {
        await login(email, password);
        navigate("/dashboard"); // redirect after successful login
      } else {
        setFormError("Login function is not available.");
      }
    } catch {
      // Error displayed through context
      // Optionally, you can set local error if you want
    }
  };

  const displayError = formError || authError;

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-background">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-2">
            <PawPrint className="h-10 w-10 text-accent" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Login to Waggle</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Welcome back! Connect with the Waggle dog matchmaking community.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} autoComplete="on">
          <CardContent className="space-y-4">
            {displayError && (
              <Alert variant="destructive">
                <AlertDescription>{displayError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                autoComplete="current-password"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3 mt-4">
            <Button
              type="submit"
              className="w-fit cursor-pointer disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <div className="text-right w-full">
              <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <p className="text-sm text-center text-muted-foreground mt-1">
              Don&apos;t have an account?{" "}
              <Link to="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;