'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SecurityProviderProps {
  children: React.ReactNode;
}

export default function SecurityProvider({ children }: SecurityProviderProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Security headers via meta tags (fallback for static hosting)
    const addSecurityMeta = () => {
      const head = document.head;
      
      // Remove existing security meta tags
      const existingMeta = head.querySelectorAll('meta[name^="security-"]');
      existingMeta.forEach(meta => meta.remove());
      
      // Add security meta tags
      const securityMetas = [
        { name: 'security-policy', content: 'strict' },
        { name: 'security-frame-options', content: 'DENY' },
        { name: 'security-content-type', content: 'nosniff' }
      ];
      
      securityMetas.forEach(({ name, content }) => {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        head.appendChild(meta);
      });
    };

    // Rate limiting check
    const checkRateLimit = () => {
      const now = Date.now();
      const requests = JSON.parse(localStorage.getItem('requestLog') || '[]');
      const recentRequests = requests.filter((time: number) => now - time < 60000); // 1 minute window
      
      if (recentRequests.length > 100) { // 100 requests per minute limit
        console.warn('Rate limit exceeded');
        return false;
      }
      
      recentRequests.push(now);
      localStorage.setItem('requestLog', JSON.stringify(recentRequests.slice(-100)));
      return true;
    };

    // Access check — public pages are always accessible
    const checkBetaAccess = () => {
      const publicPaths = [
        '/', '/creators', '/news', '/pricing', '/login',
        '/agency-demo', '/creator-signup', '/batch-campaign',
        '/beta', '/dashboard', '/campaigns', '/admin', '/founder',
        '/_next'
      ];
      if (publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
        return true;
      }
      // For any other path, allow access (no beta gate in production)
      return true;
    };

    // Input sanitization
    const sanitizeInputs = () => {
      const inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement;
          // Basic XSS prevention
          target.value = target.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        });
      });
    };

    // Session security
    const setupSessionSecurity = () => {
      // Clear sensitive data on page unload
      window.addEventListener('beforeunload', () => {
        sessionStorage.removeItem('tempData');
      });
      
      // Session timeout (30 minutes)
      const lastActivity = localStorage.getItem('lastActivity');
      const now = Date.now();
      if (lastActivity && now - parseInt(lastActivity) > 30 * 60 * 1000) {
        localStorage.removeItem('betaAccess');
        localStorage.removeItem('lastActivity');
      }
      localStorage.setItem('lastActivity', now.toString());
    };

    // Run security checks
    addSecurityMeta();
    const rateLimitOk = checkRateLimit();
    const betaAccessOk = checkBetaAccess();
    
    if (!rateLimitOk) {
      router.push('/beta');
      return;
    }
    
    if (!betaAccessOk) {
      router.push('/beta');
      return;
    }
    
    setupSessionSecurity();
    sanitizeInputs();
    
    setIsAuthorized(true);
    setIsLoading(false);
  }, [pathname, router]);

  // Security event listeners
  useEffect(() => {
    // No-op: dev tools blocking removed — it breaks accessibility and legitimate users
    return () => {};
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gaming to-accent flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Initializing secure environment...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect to beta page
  }

  return <>{children}</>;
}