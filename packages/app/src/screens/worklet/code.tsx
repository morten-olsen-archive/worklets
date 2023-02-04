import { FC } from 'react';
import { View } from 'react-native-ui-lib';
import { WorkletCodeProps } from '../../router/types';

const { default: SyntaxHighlighter } = require('react-native-syntax-highlighter');
const { dracula } = require('react-syntax-highlighter/styles/hljs');

const WorkletCodeScreen: FC<WorkletCodeProps> = ({ route }) => {
  const { worklet } = route.params;

  return (
    <View flex>
      <SyntaxHighlighter language="javascript" style={dracula}>
        {worklet.preview || worklet.code}
      </SyntaxHighlighter>
    </View>
  );
};

export { WorkletCodeScreen };
