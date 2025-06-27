import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Import custom components
import AuthForm from '@/components/AuthForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Define the submission handler for the forgot password form
  const handleForgotPasswordSubmit = (data: { email: string }) => {
    console.log('Forgot password request for:', data.email);
    setIsLoading(true);

    // Simulate an API call to send the reset link
    setTimeout(() => {
      setIsLoading(false);
      toast.success('If an account with that email exists, a password reset link has been sent.');
      
      // Optional: Redirect back to login page after a short delay
      setTimeout(() => {
        navigate('/'); // Navigate to the login page route from App.tsx
      }, 3000);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <AuthForm
          mode="forgot-password"
          isLoading={isLoading}
          onSubmit={handleForgotPasswordSubmit}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;