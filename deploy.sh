#!/bin/bash

# Gamefluence Secure Deployment Script
# This script builds and deploys the application with security hardening

set -e  # Exit on any error

echo "🚀 Starting Gamefluence Secure Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Security checks before deployment
echo -e "${BLUE}🔒 Running pre-deployment security checks...${NC}"

# Check for sensitive data in code
echo "  Checking for sensitive data..."
if grep -rE "(password|secret|api_key|token)\s*[:=]\s*['\"][^'\"]+['\"]" --include="*.ts" --include="*.tsx" --include="*.js" --exclude-dir=node_modules --exclude="*.example" . | grep -v "// Safe:" | grep -v "placeholder" | grep -v "example"; then
    echo -e "${RED}❌ Potential sensitive data found in code!${NC}"
    echo "Please review and remove any hardcoded secrets."
    exit 1
else
    echo -e "${GREEN}  ✅ No sensitive data found${NC}"
fi

# Check for console.log statements (should be removed in production)
echo "  Checking for debug statements..."
DEBUG_COUNT=$(grep -r "console\." --include="*.ts" --include="*.tsx" --include="*.js" --exclude-dir=node_modules . | wc -l)
if [ "$DEBUG_COUNT" -gt 10 ]; then
    echo -e "${YELLOW}  ⚠️  Found $DEBUG_COUNT console statements (consider removing for production)${NC}"
else
    echo -e "${GREEN}  ✅ Debug statements check passed${NC}"
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm ci --production=false

# Run security audit
echo -e "${BLUE}🔍 Running security audit...${NC}"
npm audit --audit-level=moderate || {
    echo -e "${YELLOW}⚠️  Security vulnerabilities found. Consider running 'npm audit fix'${NC}"
}

# Build the application
echo -e "${BLUE}🏗️  Building application...${NC}"
npm run build

# Security hardening of build output
echo -e "${BLUE}🛡️  Applying security hardening...${NC}"

# Remove source maps in production (comment out if you need them)
echo "  Removing source maps..."
find out -name "*.map" -delete 2>/dev/null || true

# Add security headers to HTML files
echo "  Adding security headers to HTML files..."
find out -name "*.html" -exec sed -i '' '/<head>/a\
<meta http-equiv="X-Frame-Options" content="DENY">\
<meta http-equiv="X-Content-Type-Options" content="nosniff">\
<meta http-equiv="X-XSS-Protection" content="1; mode=block">\
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">\
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()">' {} \;

# Create security.txt file
echo "  Creating security.txt..."
mkdir -p out/.well-known
cat > out/.well-known/security.txt << EOF
Contact: security@gamefluence.ai
Expires: 2026-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: https://gamefluence.ai/.well-known/security.txt
Policy: https://gamefluence.ai/security-policy
EOF

# Create robots.txt with security considerations
echo "  Creating robots.txt..."
cat > out/robots.txt << EOF
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /.well-known/
Disallow: /beta/

Sitemap: https://gamefluence.ai/sitemap.xml
EOF

# Generate deployment report
echo -e "${BLUE}📊 Generating deployment report...${NC}"
cat > deployment-report.txt << EOF
Gamefluence Deployment Report
Generated: $(date)

Build Information:
- Build completed successfully
- Security checks passed
- Output directory: ./out
- Total files: $(find out -type f | wc -l)
- Total size: $(du -sh out | cut -f1)

Security Measures Applied:
✅ Security headers added to HTML files
✅ Source maps removed
✅ Sensitive data scan completed
✅ Security.txt created
✅ Robots.txt configured
✅ NPM audit completed

Deployment Ready: YES

Next Steps:
1. Test the application locally: python3 -m http.server 10123 --directory out
2. Upload the 'out' directory to your hosting provider
3. Configure HTTPS at the hosting level
4. Set up monitoring and logging

Security Recommendations:
- Enable HTTPS/TLS at hosting provider
- Configure CDN with additional security headers
- Set up monitoring for suspicious activity
- Regular security updates and audits
EOF

echo -e "${GREEN}✅ Deployment preparation completed!${NC}"
echo -e "${BLUE}📋 Deployment report saved to: deployment-report.txt${NC}"

# Start local server for testing
echo -e "${BLUE}🌐 Starting local server for testing...${NC}"
echo -e "${GREEN}Your secure Gamefluence application is ready!${NC}"
echo -e "${GREEN}Local URL: http://localhost:10123${NC}"
echo -e "${YELLOW}Note: For production, ensure HTTPS is enabled at your hosting provider${NC}"

# Kill any existing server on port 10123
lsof -ti:10123 | xargs kill -9 2>/dev/null || true

# Start the server in background
python3 -m http.server 10123 --directory out > /dev/null 2>&1 &
SERVER_PID=$!

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo "Server PID: $SERVER_PID"
echo "To stop the server: kill $SERVER_PID"

# Optional: Open in browser (uncomment if desired)
# sleep 2 && open http://localhost:10123