#!/usr/bin/env node

const http = require('http');
const https = require('https');
const { performance } = require('perf_hooks');
const fs = require('fs');

class ServerHealthChecker {
  constructor(baseUrl = 'http://localhost:10123') {
    this.baseUrl = baseUrl;
    this.results = {
      speed: {},
      accuracy: {},
      latency: {},
      security: {},
      timestamp: new Date().toISOString()
    };
  }

  async makeRequest(path = '', options = {}) {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      const url = `${this.baseUrl}${path}`;
      
      const client = url.startsWith('https') ? https : http;
      
      const req = client.get(url, options, (res) => {
        const endTime = performance.now();
        let data = '';
        
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data,
            responseTime: endTime - startTime,
            size: Buffer.byteLength(data, 'utf8')
          });
        });
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  async testSpeed() {
    console.log('🚀 Testing Speed Performance...');
    
    const tests = [
      { path: '/', name: 'Homepage' },
      { path: '/admin/', name: 'Admin Dashboard' },
      { path: '/creators/', name: 'Creators Page' },
      { path: '/dashboard/', name: 'Dashboard' },
      { path: '/_next/static/css/65aa6e6d87680d2f.css', name: 'CSS Asset' }
    ];

    for (const test of tests) {
      try {
        const result = await this.makeRequest(test.path);
        this.results.speed[test.name] = {
          responseTime: Math.round(result.responseTime),
          size: result.size,
          status: result.statusCode,
          throughput: Math.round(result.size / (result.responseTime / 1000))
        };
        console.log(`  ✓ ${test.name}: ${Math.round(result.responseTime)}ms (${result.size} bytes)`);
      } catch (error) {
        this.results.speed[test.name] = { error: error.message };
        console.log(`  ✗ ${test.name}: ${error.message}`);
      }
    }
  }

  async testLatency() {
    console.log('⏱️  Testing Latency...');
    
    const iterations = 10;
    const latencies = [];
    
    for (let i = 0; i < iterations; i++) {
      try {
        const result = await this.makeRequest('/');
        latencies.push(result.responseTime);
      } catch (error) {
        console.log(`  ✗ Iteration ${i + 1}: ${error.message}`);
      }
    }
    
    if (latencies.length > 0) {
      const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
      const min = Math.min(...latencies);
      const max = Math.max(...latencies);
      
      this.results.latency = {
        average: Math.round(avg),
        minimum: Math.round(min),
        maximum: Math.round(max),
        samples: latencies.length,
        jitter: Math.round(max - min)
      };
      
      console.log(`  ✓ Average: ${Math.round(avg)}ms, Min: ${Math.round(min)}ms, Max: ${Math.round(max)}ms`);
      console.log(`  ✓ Jitter: ${Math.round(max - min)}ms (${latencies.length} samples)`);
    }
  }

  async testAccuracy() {
    console.log('🎯 Testing Content Accuracy...');
    
    const tests = [
      {
        path: '/',
        name: 'Homepage Content',
        checks: [
          { content: 'Gamefluence.AI', description: 'Brand name present' },
          { content: 'Gaming Studios', description: 'Target audience mentioned' },
          { content: 'Get Started', description: 'CTA button present' }
        ]
      },
      {
        path: '/admin/',
        name: 'Admin Dashboard',
        checks: [
          { content: 'Admin Dashboard', description: 'Admin title present' },
          { content: 'System Check', description: 'System tools available' }
        ]
      }
    ];

    for (const test of tests) {
      try {
        const result = await this.makeRequest(test.path);
        const passed = [];
        const failed = [];
        
        for (const check of test.checks) {
          if (result.data.includes(check.content)) {
            passed.push(check.description);
          } else {
            failed.push(check.description);
          }
        }
        
        this.results.accuracy[test.name] = {
          status: result.statusCode,
          passed: passed.length,
          failed: failed.length,
          total: test.checks.length,
          details: { passed, failed }
        };
        
        console.log(`  ✓ ${test.name}: ${passed.length}/${test.checks.length} checks passed`);
        if (failed.length > 0) {
          console.log(`    ⚠️  Failed: ${failed.join(', ')}`);
        }
      } catch (error) {
        this.results.accuracy[test.name] = { error: error.message };
        console.log(`  ✗ ${test.name}: ${error.message}`);
      }
    }
  }

  async testSecurity() {
    console.log('🔒 Testing Security Headers...');
    
    try {
      const result = await this.makeRequest('/');
      const headers = result.headers;
      
      const securityChecks = {
        'X-Frame-Options': headers['x-frame-options'] ? 'Present' : 'Missing',
        'X-Content-Type-Options': headers['x-content-type-options'] ? 'Present' : 'Missing',
        'X-XSS-Protection': headers['x-xss-protection'] ? 'Present' : 'Missing',
        'Strict-Transport-Security': headers['strict-transport-security'] ? 'Present' : 'Missing (HTTP only)',
        'Content-Security-Policy': headers['content-security-policy'] ? 'Present' : 'Missing',
        'Server Header': headers['server'] ? `Exposed: ${headers['server']}` : 'Hidden'
      };
      
      this.results.security = {
        headers: securityChecks,
        protocol: this.baseUrl.startsWith('https') ? 'HTTPS' : 'HTTP',
        status: result.statusCode
      };
      
      for (const [check, status] of Object.entries(securityChecks)) {
        const icon = status.includes('Present') || status.includes('Hidden') ? '✓' : '⚠️';
        console.log(`  ${icon} ${check}: ${status}`);
      }
      
      // Test for common vulnerabilities
      console.log('  🔍 Testing for common vulnerabilities...');
      
      // Test directory traversal
      try {
        const traversalTest = await this.makeRequest('/../etc/passwd');
        if (traversalTest.statusCode === 404) {
          console.log('  ✓ Directory traversal protection: Active');
          this.results.security.directoryTraversal = 'Protected';
        } else {
          console.log('  ⚠️  Directory traversal: Potential vulnerability');
          this.results.security.directoryTraversal = 'Vulnerable';
        }
      } catch (error) {
        console.log('  ✓ Directory traversal protection: Active');
        this.results.security.directoryTraversal = 'Protected';
      }
      
    } catch (error) {
      this.results.security = { error: error.message };
      console.log(`  ✗ Security test failed: ${error.message}`);
    }
  }

  generateReport() {
    console.log('\n📊 COMPREHENSIVE SERVER HEALTH REPORT');
    console.log('=' .repeat(50));
    
    // Speed Summary
    console.log('\n🚀 SPEED PERFORMANCE:');
    const speedEntries = Object.entries(this.results.speed);
    if (speedEntries.length > 0) {
      const avgSpeed = speedEntries
        .filter(([_, data]) => !data.error)
        .reduce((sum, [_, data]) => sum + data.responseTime, 0) / speedEntries.length;
      console.log(`   Average Response Time: ${Math.round(avgSpeed)}ms`);
      
      speedEntries.forEach(([name, data]) => {
        if (!data.error) {
          const rating = data.responseTime < 100 ? '🟢' : data.responseTime < 500 ? '🟡' : '🔴';
          console.log(`   ${rating} ${name}: ${data.responseTime}ms`);
        }
      });
    }
    
    // Latency Summary
    console.log('\n⏱️  LATENCY ANALYSIS:');
    if (this.results.latency.average) {
      const rating = this.results.latency.average < 100 ? '🟢 Excellent' : 
                    this.results.latency.average < 300 ? '🟡 Good' : '🔴 Needs Improvement';
      console.log(`   ${rating} (${this.results.latency.average}ms avg)`);
      console.log(`   Consistency: ${this.results.latency.jitter}ms jitter`);
    }
    
    // Accuracy Summary
    console.log('\n🎯 CONTENT ACCURACY:');
    const accuracyEntries = Object.entries(this.results.accuracy);
    if (accuracyEntries.length > 0) {
      accuracyEntries.forEach(([name, data]) => {
        if (!data.error) {
          const percentage = Math.round((data.passed / data.total) * 100);
          const rating = percentage === 100 ? '🟢' : percentage >= 80 ? '🟡' : '🔴';
          console.log(`   ${rating} ${name}: ${percentage}% (${data.passed}/${data.total})`);
        }
      });
    }
    
    // Security Summary
    console.log('\n🔒 SECURITY STATUS:');
    if (this.results.security.headers) {
      const secureHeaders = Object.values(this.results.security.headers)
        .filter(status => status.includes('Present') || status.includes('Hidden')).length;
      const totalHeaders = Object.keys(this.results.security.headers).length;
      const securityScore = Math.round((secureHeaders / totalHeaders) * 100);
      
      const rating = securityScore >= 80 ? '🟢 Good' : securityScore >= 60 ? '🟡 Fair' : '🔴 Poor';
      console.log(`   ${rating} Security Score: ${securityScore}%`);
      console.log(`   Protocol: ${this.results.security.protocol}`);
    }
    
    console.log('\n' + '=' .repeat(50));
    console.log(`Report generated: ${this.results.timestamp}`);
    
    return this.results;
  }

  async runAllTests() {
    console.log(`🔍 Starting comprehensive server health check for: ${this.baseUrl}\n`);
    
    await this.testSpeed();
    await this.testLatency();
    await this.testAccuracy();
    await this.testSecurity();
    
    const report = this.generateReport();
    
    // Save detailed report
    fs.writeFileSync('server-health-report.json', JSON.stringify(report, null, 2));
    console.log('\n💾 Detailed report saved to: server-health-report.json');
    
    return report;
  }
}

// Run the health check
if (require.main === module) {
  const checker = new ServerHealthChecker();
  checker.runAllTests().catch(console.error);
}

module.exports = ServerHealthChecker;