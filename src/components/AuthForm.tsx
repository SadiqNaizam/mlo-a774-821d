import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

// Schemas for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const resetPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


// Union of schema types for form data
type FormData = z.infer<typeof loginSchema> | z.infer<typeof registerSchema> | z.infer<typeof forgotPasswordSchema> | z.infer<typeof resetPasswordSchema>;

// Component Props
interface AuthFormProps {
  mode: 'login' | 'register' | 'forgot-password' | 'reset-password';
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const formConfig = {
  login: {
    schema: loginSchema,
    title: "Welcome Back!",
    description: "Enter your credentials to access your account.",
    fields: ["email", "password"],
    submitText: "Sign In",
  },
  register: {
    schema: registerSchema,
    title: "Create an Account",
    description: "Fill in the details below to get started.",
    fields: ["name", "email", "password"],
    submitText: "Sign Up",
  },
  'forgot-password': {
    schema: forgotPasswordSchema,
    title: "Forgot Password?",
    description: "Enter your email and we'll send you a reset link.",
    fields: ["email"],
    submitText: "Send Reset Link",
  },
  'reset-password': {
      schema: resetPasswordSchema,
      title: "Reset Your Password",
      description: "Enter a new secure password for your account.",
      fields: ["password", "confirmPassword"],
      submitText: "Reset Password"
  }
};

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isLoading }) => {
  console.log(`AuthForm loaded in ${mode} mode.`);
  
  const config = formConfig[mode];
  const form = useForm<FormData>({
    resolver: zodResolver(config.schema),
    defaultValues: config.fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}),
  });

  const renderField = (fieldName: string) => (
    <FormField
      key={fieldName}
      control={form.control}
      name={fieldName as keyof FormData}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{fieldName.replace('confirmPassword', 'Confirm Password')}</FormLabel>
          <FormControl>
            <Input
              type={fieldName.includes('password') ? 'password' : 'text'}
              placeholder={`Enter your ${fieldName.replace('confirmPassword', 'password')}`}
              {...field}
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {config.fields.map(renderField)}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {config.submitText}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 text-sm">
        {mode === 'login' && (
          <div className="flex justify-between w-full">
            <Button variant="link" asChild className="p-0 h-auto">
                <Link to="/registration">Don't have an account? Sign up</Link>
            </Button>
            <Button variant="link" asChild className="p-0 h-auto">
                <Link to="/forgot-password">Forgot password?</Link>
            </Button>
          </div>
        )}
        {mode === 'register' && (
           <Button variant="link" asChild className="p-0 h-auto">
              <Link to="/">Already have an account? Sign in</Link>
           </Button>
        )}
        {(mode === 'forgot-password' || mode === 'reset-password') && (
            <Button variant="link" asChild className="p-0 h-auto">
                <Link to="/">Back to Sign in</Link>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;