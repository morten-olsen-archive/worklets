module.exports = {
  name: 'Slack Test Worklet',
  entry: 'slack.tsx',
  description: 'Fetch a list of channels',
  env: [
    'SLACK_TOKEN',
  ]
};
