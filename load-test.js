#!/usr/bin/env node

const http = require('http');
const { performance } = require('perf_hooks');

class LoadTester {
  constructor(baseUrl = 'http://localhost:10123', concurrency = 10, requests = 100) {
    this.baseUrl = baseUrl;
    this.concurrency = concurrency;
    this.totalRequests = requests;
    this.results = [];
    this.errors = [];
  }

  async makeRequest(path = '/') {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      const url = `${this.baseUrl}${path}`;
      
      const req = http.get(url, (res) => {
        const endTime = performance.now();
        let data = '';
        
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            responseTime: endTime - startTime,
            size: Buffer.byteLength(data, 'utf8'),
            success: res.statusCode === 200
          });
        });
      });
      
      req.on('error', (error) => {
        const endTime = performance.now();
        reject({
          error: error.message,
          responseTime: endTime - startTime
        });
      });
      
      req.setTimeout(5000, () => {
        req.destroy();
        reject({
          error: 'Request timeout',
          responseTime: 5000
        });
      });
    });
  }

  async runLoadTest() {
    console.log(`🚀 Starting load test: ${this.totalRequests} requests with ${this.concurrency} concurrent connections`);
    console.log(`Target: ${this.baseUrl}\n`);
    
    const startTime = performance.now();
    const promises = [];
    
    // Create batches of concurrent requests
    for (let i = 0; i < this.totalRequests; i += this.concurrency) {
      const batch = [];
      const batchSize = Math.min(this.concurrency, this.totalRequests - i);
      
      for (let j = 0; j < batchSize; j++) {
        batch.push(
          this.makeRequest('/')
            .then(result => {
              this.results.push(result);
              process.stdout.write('.');
            })
            .catch(error => {
              this.errors.push(error);
              process.stdout.write('x');
            })
        );
      }
      
      await Promise.all(batch);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    console.log('\n\n📊 LOAD TEST RESULTS');
    console.log('=' .repeat(40));
    
    const successful = this.results.filter(r => r.success).length;
    const failed = this.errors.length + this.results.filter(r => !r.success).length;
    
    console.log(`Total Requests: ${this.totalRequests}`);
    console.log(`Successful: ${successful} (${Math.round(successful/this.totalRequests*100)}%)`);
    console.log(`Failed: ${failed} (${Math.round(failed/this.totalRequests*100)}%)`);
    console.log(`Total Time: ${Math.round(totalTime)}ms`);
    console.log(`Requests/sec: ${Math.round(this.totalRequests / (totalTime/1000))}`);
    
    if (this.results.length > 0) {
      const responseTimes = this.results.map(r => r.responseTime);
      const avgResponse = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const minResponse = Math.min(...responseTimes);
      const maxResponse = Math.max(...responseTimes);
      
      // Calculate percentiles
      const sorted = responseTimes.sort((a, b) => a - b);
      const p50 = sorted[Math.floor(sorted.length * 0.5)];
      const p95 = sorted[Math.floor(sorted.length * 0.95)];
      const p99 = sorted[Math.floor(sorted.length * 0.99)];
      
      console.log('\n⏱️  RESPONSE TIME ANALYSIS:');
      console.log(`Average: ${Math.round(avgResponse)}ms`);
      console.log(`Minimum: ${Math.round(minResponse)}ms`);
      console.log(`Maximum: ${Math.round(maxResponse)}ms`);
      console.log(`50th percentile: ${Math.round(p50)}ms`);
      console.log(`95th percentile: ${Math.round(p95)}ms`);
      console.log(`99th percentile: ${Math.round(p99)}ms`);
      
      // Performance rating
      const rating = avgResponse < 100 ? '🟢 Excellent' : 
                    avgResponse < 300 ? '🟡 Good' : 
                    avgResponse < 1000 ? '🟠 Fair' : '🔴 Poor';
      console.log(`\nPerformance Rating: ${rating}`);
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERROR ANALYSIS:');
      const errorTypes = {};
      this.errors.forEach(error => {
        errorTypes[error.error] = (errorTypes[error.error] || 0) + 1;
      });
      
      Object.entries(errorTypes).forEach(([error, count]) => {
        console.log(`  ${error}: ${count} occurrences`);
      });
    }
    
    return {
      totalRequests: this.totalRequests,
      successful,
      failed,
      totalTime: Math.round(totalTime),
      requestsPerSecond: Math.round(this.totalRequests / (totalTime/1000)),
      avgResponseTime: this.results.length > 0 ? Math.round(this.results.reduce((sum, r) => sum + r.responseTime, 0) / this.results.length) : 0
    };
  }
}

// Run load test
if (require.main === module) {
  const tester = new LoadTester('http://localhost:10123', 5, 50);
  tester.runLoadTest().catch(console.error);
}

module.exports = LoadTester;