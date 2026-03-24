import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Collections from '@/pages/Collections';
import NotFound from '@/pages/NotFound';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="pt-16 md:pt-20"> {/* Offset for fixed header h-16 md:h-20 */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />

              <Route path="/live-showroom" element={<div style={{padding: '2rem', textAlign: 'center'}}>Live Showroom Coming Soon</div>} />

              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:type" element={<Collections />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />

        </div>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

