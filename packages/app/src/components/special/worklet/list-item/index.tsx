import { WorkletBundle } from '@morten-olsen/worklet-sdk';
import { useNavigation } from '@react-navigation/native';
import { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { View, Text, Button, Card, Avatar } from 'react-native-ui-lib';
import { useRemoveWorklet } from '../../../../features/worklets';
import { HomeProps } from '../../../../router/types';

type Props = {
  worklet: WorkletBundle;
};

const WorkletListItem: FC<Props> = ({ worklet }) => {
  const navigation = useNavigation<HomeProps['navigation']>();
  const removeWorklet = useRemoveWorklet();

  const open = useCallback(() => {
    navigation.push('WorkletDetails', { worklet });
  }, [navigation, worklet]);

  const remove = useCallback(() => {
    removeWorklet(worklet);
  }, [removeWorklet, worklet]);
  return (
    <Card centerV row margin-10 padding-10 borderRadius={0} onPress={open}>
      <Avatar size={40} />
      <View flex centerV marginH-10>
        <Text body2>{worklet.name}</Text>
        {worklet.description && <Text numberOfLines={2}>{worklet.description}</Text>}
      </View>
      <TouchableOpacity onPress={remove}>
        <View>
          <Feather name="x" color="red" size={24} />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export { WorkletListItem };
