module.exports = {
  name: 'AWS Test Worklet',
  entry: 'aws.tsx',
  description: 'Fetch a list of AWS buckets',
  env: [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_SESSION_TOKEN',
  ]
};
