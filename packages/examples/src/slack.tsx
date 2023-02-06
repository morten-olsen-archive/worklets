/// <reference types="@morten-olsen/worklet" />
import { WebClient } from '@slack/web-api';
(process as any).version = 'sdf';

const { render } = worklet;
const { Text, View } = RNUILib;

render.html('test ' + process.version);

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

const channels = await web.users.list();

if (!channels.ok) {
  throw new Error('Could not fetch channels');
}

render.element(
  <View>
    <Text>Users</Text>
    {channels.members?.map((bucket) => (
      <View key={bucket.name}>
        <Text>{bucket.name}</Text>
      </View>
    ))}
  </View>,
);
