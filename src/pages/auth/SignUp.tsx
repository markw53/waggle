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
import useAuth from "../../compoments/hooks/useAuth"; // Should provide signUp()

interface SignUpFormData {
  displayName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    displayName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const auth = useAuth();
  const signUp = auth?.signUp ?? (() => Promise.reject(new Error("Auth not initialized")));
  const authLoading = auth?.loading ?? false;
  const authError = auth?.error ?? "";
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.displayName || !formData.email || !formData.password) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setFormError("");
    try {
      await signUp(formData.email, formData.password, formData.displayName);
      navigate("/dashboard");
    } catch (err: unknown) {
      // Error handled in auth context, but you can set a fallback:
      if (err instanceof Error) {
        setFormError(err.message || "Registration failed. Please try again.");
      } else {
        setFormError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const displayError = formError || authError;

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-2">
            <PawPrint className="h-10 w-10 text-accent" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Join Waggle
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Create your free Waggle account to connect and match new furry friends.
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
              <Label htmlFor="displayName">Your Name *</Label>
              <Input
                id="displayName"
                name="displayName"
                placeholder="Jane Doglover"
                value={formData.displayName}
                onChange={handleChange}
                disabled={loading || authLoading}
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading || authLoading}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading || authLoading}
                required
                autoComplete="new-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 mt-4">
            <Button
              type="submit"
              className="w-fit cursor-pointer disabled:cursor-not-allowed"
              disabled={loading || authLoading}
            >
              {(loading || authLoading) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;