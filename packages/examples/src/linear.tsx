/// <reference types="@morten-olsen/worklet" />

import { LinearClient } from '@linear/sdk';
const { render, device } = worklet;
const { Text, View, Button } = RNUILib;

const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_TOKEN,
});

const user = await linearClient.viewer;

render.html(`<h1>Hello ${user.name}</h1>`);

const issues = await user.assignedIssues({});

render.element(
  <View>
    {issues.nodes.slice(0, 10).map((issue) => (
      <View padding-10 row centerV>
        <View padding-5>
          <Text>{issue.number}</Text>
        </View>
        <View padding-5 flex>
          <Text padding-5>{issue.title}</Text>
        </View>
        <Button onPress={() => device.openUrl?.(issue.url)} label="Open" />
      </View>
    ))}
  </View>,
);
