import { Task } from '@morten-olsen/worklet-runtime';
import { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Toast, Text, Button, Card } from 'react-native-ui-lib';
import { Avatar } from 'react-native-ui-lib/src/components/avatar';
import { TaskOutputRender } from '../../components/special/task/output-render';
import { useRun } from '../../features/runtime';
import { WorkletDetailsProps } from '../../router/types';

const WorkletDetailsScreen: FC<WorkletDetailsProps> = ({ route, navigation }) => {
  const { worklet } = route.params;
  const run = useRun();
  const [task, setTask] = useState<Task | null>(null);
  const [status, setStatus] = useState<Task['status'] | null>(null);
  const [error, setError] = useState<any>(null);

  const invoke = useCallback(async () => {
    if (task?.status === 'pending') {
      return;
    }

    const newTask = run(worklet);
    setStatus(newTask.status);
    setError(null);
    setTask(newTask);
  }, [worklet, run, task?.status]);

  useEffect(() => {
    if (!task) {
      return;
    }
    const updateState = (next: Task) => {
      setStatus(next.status);
      setError(next.error?.toString());
    };
    task.on('finalized', updateState);
    return () => {
      task.off('finalized', updateState);
    };
  }, [task]);

  return (
    <>
      <View backgroundColor="#fff" centerV row padding-10>
        <Avatar size={40} margin-10 />
        <View flex centerV margin-10>
          <Text body2>{worklet.name}</Text>
          <Text>{status || 'Not run'}</Text>
        </View>
        <Button margin-5 disabled={task?.status === 'pending'} label="Run" onPress={invoke} />
        <Button
          margin-5
          label="Code"
          bg="secondary"
          onPress={() => navigation.navigate('WorkletCode', { worklet })}
        />
      </View>
      <View flex>{task && <TaskOutputRender task={task} />}</View>
      <Toast
        position="bottom"
        error
        action={{
          label: 'hide',
          onPress: () => setError(null),
        }}
        visible={!!error}
        message={error?.toString()}
        onDismiss={() => setError(null)}
      />
    </>
  );
};

export { WorkletDetailsScreen };
