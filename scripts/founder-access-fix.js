// Founder Access Fix - Emergency access script
console.log('🔑 Gamefluence Founder Access Fix');

// Method 1: Direct localStorage setup
console.log('\n📝 Setting up founder access in localStorage...');

if (typeof window !== 'undefined') {
  localStorage.setItem('founderAccess', 'granted');
  localStorage.setItem('adminLevel', 'founder');
  localStorage.setItem('betaAccess', 'granted');
  localStorage.setItem('loginTime', new Date().toISOString());
  
  console.log('✅ Founder access granted');
  console.log('✅ Admin level set to founder');
  console.log('✅ Beta access granted');
  console.log('✅ Login time recorded');
  
  console.log('\n🚀 You can now access:');
  console.log('• /admin - Full admin portal');
  console.log('• /campaigns - Campaign management');
  console.log('• /logo-test - Logo testing');
  console.log('• All founder-protected areas');
  
} else {
  console.log('❌ Not in browser environment');
}

// Method 2: URL-based access
console.log('\n🔗 Alternative access methods:');
console.log('1. Run this script in browser console on any page');
console.log('2. Use the emergency access URL parameters');
console.log('3. Direct localStorage manipulation');

// Emergency credentials reminder
console.log('\n🔑 Founder Credentials:');
console.log('Username: founder');
console.log('Password: GamefluenceAI2026!');
console.log('Master Key: MASTER_OVERRIDE_ALPHA_PRIME');

console.log('\n✨ Access fix complete!');