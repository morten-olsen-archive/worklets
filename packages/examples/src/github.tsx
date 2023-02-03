/// <reference types="@morten-olsen/worklet" />
import { Octokit } from '@octokit/rest';

const { render, wait } = worklet;
const { Text, Button, View } = RNUILib;

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const user = await octokit.rest.users.getAuthenticated();
const { promise, resolve } = wait();

const Welcome = () => {
  const show = () => {
    console.log('test');
    render.element(
      <Text body2>
        Awesome {user.data.name}, this shows that components can be interactive to!!!
      </Text>,
    );
    resolve();
  };
  return (
    <View row centerV>
      <View flex>
        <Text>Try to click me!</Text>
      </View>
      <Button label="Click me" onPress={show} />
    </View>
  );
};

render.html(`<h1>Hello ${user.data.name} from GitHub</h1>`);
render.element(<Welcome />);

module.exports = promise;
