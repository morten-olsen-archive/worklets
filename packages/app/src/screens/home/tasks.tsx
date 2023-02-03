import { FC } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, View } from 'react-native-ui-lib';
import { WorkletListItem } from '../../components/special/worklet/list-item';
import { useWorklets } from '../../features/worklets';
import { HomeProps } from '../../router/types';

const HomeTasksScreen: FC<HomeProps> = ({ navigation }) => {
  const worklets = useWorklets();
  return (
    <ScrollView>
      {worklets.map((worklet) => (
        <WorkletListItem key={worklet.name} worklet={worklet} />
      ))}
      <View padding-10>
        <Button label="Add" onPress={() => navigation.push('Scan')} />
      </View>
    </ScrollView>
  );
};

export { HomeTasksScreen };
