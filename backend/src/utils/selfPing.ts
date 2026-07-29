export const startSelfPing = () => {
  // Use environment variables with fallbacks
  const pingUrl = process.env.SELF_PING_URL 
    ? `${process.env.SELF_PING_URL}/api/health` 
    : 'http://localhost:5000/api/health';
    
  const intervalStr = process.env.SELF_PING_INTERVAL_MS || '900000'; // Default: 15 mins
  const intervalMs = parseInt(intervalStr, 10);

  console.log(`⏱️  Initializing self-ping to ${pingUrl} every ${intervalMs / 1000} seconds.`);

  setInterval(async () => {
    try {
      const response = await fetch(pingUrl);
      if (response.ok) {
        console.log(`✅ [${new Date().toISOString()}] Self-ping successful - Status: ${response.status}`);
      } else {
        console.error(`⚠️ [${new Date().toISOString()}] Self-ping failed - Status: ${response.status}`);
      }
    } catch (error: any) {
      console.error(`❌ [${new Date().toISOString()}] Self-ping error:`, error.message);
    }
  }, intervalMs);
};