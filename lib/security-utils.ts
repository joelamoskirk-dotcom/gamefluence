// Client-side security utilities
// NOTE: These are defense-in-depth measures. Primary security is enforced
// server-side via middleware, auth API, and security headers in next.config.js.

export class SecurityManager {
  private static instance: SecurityManager;
  private requestLog: number[] = [];
  private maxRequestsPerMinute = 100;

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  // Client-side rate limiting (supplementary — server enforces the real limit)
  checkRateLimit(): boolean {
    const now = Date.now();
    this.requestLog = this.requestLog.filter(time => now - time < 60000);

    if (this.requestLog.length >= this.maxRequestsPerMinute) {
      console.warn('Rate limit exceeded');
      return false;
    }

    this.requestLog.push(now);
    return true;
  }

  // Input sanitization — strips dangerous HTML/JS patterns
  sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/[<>]/g, '');
  }

  // XSS prevention — HTML entity encoding
  escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (char) => map[char] || char);
  }

  // Session management
  initializeSession(): void {
    const sessionId = this.generateSessionId();
    sessionStorage.setItem('sessionId', sessionId);
    sessionStorage.setItem('sessionStart', Date.now().toString());
    this.setupAutoLogout();
  }

  private generateSessionId(): string {
    // Use crypto API for secure random values
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback for older browsers
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  }

  private setupAutoLogout(): void {
    let lastActivity = Date.now();

    const updateActivity = () => {
      lastActivity = Date.now();
    };

    ['mousedown', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    setInterval(() => {
      if (Date.now() - lastActivity > 30 * 60 * 1000) {
        this.logout();
      }
    }, 60000);
  }

  async logout(): Promise<void> {
    // Clear server session
    try {
      await fetch('/api/auth/founder', { method: 'DELETE' });
    } catch {
      // Best-effort — cookie will expire anyway
    }

    // Clear client state
    localStorage.removeItem('betaAccess');
    localStorage.removeItem('loginTime');
    sessionStorage.clear();
    window.location.href = '/';
  }

  // Validate beta access (client-side check only)
  validateBetaAccess(): boolean {
    const betaAccess = localStorage.getItem('betaAccess');
    const sessionStart = sessionStorage.getItem('sessionStart');

    if (!betaAccess || betaAccess !== 'granted') {
      return false;
    }

    if (sessionStart) {
      const sessionAge = Date.now() - parseInt(sessionStart);
      if (sessionAge > 24 * 60 * 60 * 1000) {
        this.logout();
        return false;
      }
    }

    return true;
  }

  // Initialize client-side security measures
  initialize(): void {
    this.initializeSession();

    // Prevent iframe embedding (defense-in-depth — X-Frame-Options header is primary)
    if (typeof window !== 'undefined' && window.top !== window.self) {
      window.top!.location.href = window.self.location.href;
    }
  }
}

// Export singleton instance
export const security = SecurityManager.getInstance();
