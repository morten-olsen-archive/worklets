import { WorkletBundle } from '@morten-olsen/worklet-sdk';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  WorkletDetails: {
    worklet: WorkletBundle;
  };
  WorkletCode: {
    worklet: WorkletBundle;
  };
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type ScanProps = NativeStackScreenProps<RootStackParamList, 'Scan'>;
type WorkletDetailsProps = NativeStackScreenProps<RootStackParamList, 'WorkletDetails'>;
type WorkletCodeProps = NativeStackScreenProps<RootStackParamList, 'WorkletCode'>;

export type { HomeProps, ScanProps, RootStackParamList, WorkletDetailsProps, WorkletCodeProps };
