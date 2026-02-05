// scripts/initialize-db.js
const { execSync } = require('child_process');

console.log('Running database initialization...');

try {
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Push schema to database
  console.log('Pushing schema to database...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('Database initialization completed successfully!');
} catch (error) {
  console.error('Database initialization failed:', error.message);
  process.exit(1);
}