import { Task } from '@morten-olsen/worklet-runtime';
import { RenderType } from '@morten-olsen/worklet-runtime/dist/cjs/types/render';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import makeWebshell, {
  HandleHTMLDimensionsFeature,
  ForceResponsiveViewportFeature,
  ForceElementSizeFeature,
  useAutoheight,
  WebshellProps,
} from '@formidable-webview/webshell';
import { WebView, WebViewProps } from 'react-native-webview';
import { Card, Text, View } from 'react-native-ui-lib';
import { FlatList, LayoutChangeEvent } from 'react-native';

const Webshell = makeWebshell(
  WebView,
  new HandleHTMLDimensionsFeature(),
  new ForceResponsiveViewportFeature({ maxScale: 1 }),
  new ForceElementSizeFeature({
    target: 'body',
    heightValue: 'auto',
    widthValue: 'auto',
  }),
);

function ResilientAutoheightWebView(props: WebshellProps<WebViewProps, any>) {
  const { autoheightWebshellProps } = useAutoheight({
    webshellProps: props,
  });
  return <Webshell {...autoheightWebshellProps} />;
}

type Props = {
  task: Task;
};

const renderType = (render: RenderType) => {
  switch (render.type) {
    case 'url': {
      return <WebView source={{ uri: render.url }} />;
    }
    case 'html': {
      return (
        <ResilientAutoheightWebView
          originWhitelist={['*']}
          scrollEnabled={false}
          source={{ html: render.content }}
        />
      );
    }
    case 'element': {
      return <>{render.element}</>;
    }
    default: {
      return <Text>Unknown render type</Text>;
    }
  }
};

const AnimateIn = ({ children }: { children: React.ReactNode }) => {
  const height = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    height: Math.round(height.value),
  }));

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      height.value = withSpring(e.nativeEvent.layout.height);
    },
    [height],
  );
  return (
    <Animated.View style={[{}, animatedStyles]}>
      <View style={{ position: 'absolute', width: '100%' }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

const Spacer = () => <View height={50} />;

const TaskOutputRender: FC<Props> = ({ task }) => {
  const [renders, setRenders] = useState(task.renders);
  useEffect(() => {
    setRenders([...task.renders].reverse());
  }, [task]);

  useEffect(() => {
    const update = (next: Task) => {
      setRenders([...next.renders].reverse());
    };
    task.on('render', update);
    return () => {
      task.off('render', update);
    };
  }, [task]);

  return (
    <FlatList
      data={renders}
      inverted
      ListHeaderComponent={Spacer}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AnimateIn>
          <Card margin-10 padding-10 borderRadius={3}>
            {renderType(item)}
          </Card>
        </AnimateIn>
      )}
    />
  );
};

export { TaskOutputRender };
