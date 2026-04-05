// Security utilities for client-side protection
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

  // Rate limiting
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

  // Input sanitization
  sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/[<>]/g, '');
  }

  // XSS prevention
  escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Session management
  initializeSession(): void {
    const sessionId = this.generateSessionId();
    sessionStorage.setItem('sessionId', sessionId);
    sessionStorage.setItem('sessionStart', Date.now().toString());
    
    // Auto-logout after 30 minutes of inactivity
    this.setupAutoLogout();
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private setupAutoLogout(): void {
    let lastActivity = Date.now();
    
    const updateActivity = () => {
      lastActivity = Date.now();
      localStorage.setItem('lastActivity', lastActivity.toString());
    };

    // Track user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Check for inactivity every minute
    setInterval(() => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;
      
      if (timeSinceActivity > 30 * 60 * 1000) { // 30 minutes
        this.logout();
      }
    }, 60000);
  }

  logout(): void {
    localStorage.removeItem('betaAccess');
    localStorage.removeItem('lastActivity');
    sessionStorage.clear();
    window.location.href = '/beta';
  }

  // Content Security Policy enforcement (client-side)
  enforceCSP(): void {
    // Remove any inline scripts that weren't intended
    const scripts = document.querySelectorAll('script:not([src])');
    scripts.forEach(script => {
      if (!script.textContent?.includes('__next') && !script.textContent?.includes('self.__next')) {
        script.remove();
      }
    });
  }

  // Secure headers simulation (for static hosting)
  addSecurityHeaders(): void {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;";
    document.head.appendChild(meta);

    // Add other security meta tags
    const securityMetas = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'format-detection', content: 'telephone=no' }
    ];

    securityMetas.forEach(({ name, content }) => {
      const metaTag = document.createElement('meta');
      metaTag.name = name;
      metaTag.content = content;
      document.head.appendChild(metaTag);
    });
  }

  // Prevent common attacks and code inspection
  preventCommonAttacks(): void {
    // Disable drag and drop to prevent file injection
    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => e.preventDefault());

    // Prevent iframe embedding
    if (window.top !== window.self) {
      window.top!.location.href = window.self.location.href;
    }

    // Anti-scraping measures
    this.enableAntiScraping();
    
    // Disable dev tools and inspection
    this.disableDevTools();
    
    // Obfuscate DOM structure
    this.obfuscateDOM();
    
    // Clear clipboard on sensitive pages
    document.addEventListener('copy', (e) => {
      if (window.location.pathname.includes('/admin')) {
        e.clipboardData?.setData('text/plain', '');
        e.preventDefault();
      }
    });
  }

  // Anti-scraping protection
  private enableAntiScraping(): void {
    // Detect automated browsers/scrapers
    const detectBot = () => {
      const botPatterns = [
        /bot/i, /crawler/i, /spider/i, /scraper/i,
        /headless/i, /phantom/i, /selenium/i, /puppeteer/i
      ];
      
      const userAgent = navigator.userAgent;
      const isBot = botPatterns.some(pattern => pattern.test(userAgent));
      
      if (isBot || !navigator.webdriver === undefined) {
        document.body.innerHTML = '<div style="text-align:center;padding:50px;">Access Denied</div>';
        return;
      }
    };

    // Mouse movement detection (bots typically don't move mouse)
    let mouseMovements = 0;
    document.addEventListener('mousemove', () => {
      mouseMovements++;
    });

    setTimeout(() => {
      if (mouseMovements < 3) {
        console.warn('Suspicious activity detected');
        // Could redirect or block access
      }
    }, 10000);

    // Detect rapid requests (scraping behavior)
    let requestCount = 0;
    const originalFetch = window.fetch;
    window.fetch = (...args) => {
      requestCount++;
      if (requestCount > 50) {
        throw new Error('Rate limit exceeded');
      }
      return originalFetch(...args);
    };

    detectBot();
  }

  // NOTE: Dev tools blocking removed — it breaks legitimate users and accessibility tools.
  // Security is enforced server-side via auth, rate limiting, and CSP headers instead.
  private disableDevTools(): void {
    // Only disable text selection on elements explicitly marked .no-select
    document.addEventListener('selectstart', (e) => {
      if ((e.target as Element).closest('.no-select')) {
        e.preventDefault();
      }
    });
  }

  // Obfuscate DOM structure
  private obfuscateDOM(): void {
    // Add random classes to confuse scrapers
    const addRandomClasses = () => {
      const elements = document.querySelectorAll('div, span, p, h1, h2, h3');
      elements.forEach(el => {
        const randomClass = 'x' + Math.random().toString(36).substr(2, 9);
        el.classList.add(randomClass);
      });
    };

    // Dynamically change element IDs
    const obfuscateIds = () => {
      const elements = document.querySelectorAll('[id]');
      elements.forEach(el => {
        if (!el.id.startsWith('__next')) {
          const newId = 'id_' + Math.random().toString(36).substr(2, 9);
          el.id = newId;
        }
      });
    };

    // Add decoy elements
    const addDecoyElements = () => {
      const decoys = [
        '<div style="display:none;">Decoy content for scrapers</div>',
        '<span style="position:absolute;left:-9999px;">Hidden text</span>',
        '<div style="opacity:0;height:0;">Invisible content</div>'
      ];
      
      decoys.forEach(decoy => {
        const div = document.createElement('div');
        div.innerHTML = decoy;
        document.body.appendChild(div);
      });
    };

    setTimeout(() => {
      addRandomClasses();
      obfuscateIds();
      addDecoyElements();
    }, 1000);
  }

  // Validate beta access
  validateBetaAccess(): boolean {
    const betaAccess = localStorage.getItem('betaAccess');
    const sessionStart = sessionStorage.getItem('sessionStart');
    
    if (!betaAccess || betaAccess !== 'granted') {
      return false;
    }

    // Check session validity (24 hours max)
    if (sessionStart) {
      const sessionAge = Date.now() - parseInt(sessionStart);
      if (sessionAge > 24 * 60 * 60 * 1000) {
        this.logout();
        return false;
      }
    }

    return true;
  }

  // Initialize all security measures
  initialize(): void {
    this.addSecurityHeaders();
    this.enforceCSP();
    this.preventCommonAttacks();
    this.initializeSession();
  }
}

// Export singleton instance
export const security = SecurityManager.getInstance();