/// <reference types="@morten-olsen/worklet" />

const { render } = worklet;
const { Text, View } = RNUILib;
import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

const buckets = await s3.listBuckets().promise();

render.element(
  <View>
    <Text>My buckets</Text>
    {buckets.Buckets?.map((bucket) => (
      <View key={bucket.Name}>
        <Text>{bucket.Name}</Text>
      </View>
    ))}
  </View>,
);
