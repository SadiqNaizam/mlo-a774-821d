import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Custom Components
import AuthForm from '@/components/AuthForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { useToast } from "@/components/ui/use-toast";

// Define the expected shape of the login form data for clarity
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginSubmit = (data: unknown) => {
    // This function simulates an API call for login
    setIsLoading(true);
    const loginData = data as LoginFormData;
    console.log("Attempting login with:", loginData);

    // Simulate network delay
    setTimeout(() => {
      // In a real app, you would validate credentials here
      // For this demo, we'll assume success.
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting you to the dashboard.",
      });
      setIsLoading(false);
      navigate('/dashboard'); // Navigate to the dashboard on successful login
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <AuthForm
          mode="login"
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;