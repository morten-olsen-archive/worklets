import { FC } from 'react';
import { TextInput } from 'react-native';
import { View } from 'react-native-ui-lib';
import { WorkletCodeProps } from '../../router/types';

const WorkletCodeScreen: FC<WorkletCodeProps> = ({ route }) => {
  const { worklet } = route.params;

  return (
    <View>
      <TextInput multiline value={worklet.code} editable={false} />
    </View>
  );
};

export { WorkletCodeScreen };
