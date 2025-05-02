
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const AppPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center px-4">
          <div className="rounded-full overflow-hidden border-2 border-primary/20 p-2 bg-white inline-block mb-6">
            <img
              src="/lovable-uploads/4546c2ea-9a15-40c9-a1ec-f046c06e8245.png"
              alt="Mindflow Logo"
              className="h-24 w-24 object-contain rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to Mindflow App</h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto mb-8">
            This is where the main application would be. Currently in development.
            Please check back soon for the full meditation and stress management experience.
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Return to Home Page
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppPage;
