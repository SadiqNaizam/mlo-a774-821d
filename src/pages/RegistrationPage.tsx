import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import custom components
import AuthForm from '@/components/AuthForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import UI components for notifications
import { useToast } from "@/components/ui/use-toast";

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = (data: any) => {
    console.log('Registration form submitted with:', data);
    setIsLoading(true);

    // Simulate an API call for registration
    setTimeout(() => {
      setIsLoading(false);

      // Show success notification
      toast({
        title: "Account Created Successfully!",
        description: "You can now sign in with your new credentials.",
      });

      // Redirect to the login page after successful registration
      // The path "/" maps to LoginPage in App.tsx
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthForm 
          mode="register"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;