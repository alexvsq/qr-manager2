import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector, Pressable } from 'react-native-gesture-handler';
import { useState, ReactNode, useCallback } from 'react';
import { COLORS, SHADOW_DEFAULT } from "@/utils/constants";

const HEIGHT_SCREEN = Dimensions.get('window').height;

const MAXIMUM_HEIGHT = HEIGHT_SCREEN * 0.8;

const SPRING_CONFIG = {
    damping: 15,
    stiffness: 150,
    mass: 1,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
};

export default function ListDynamic({ children }: { children: ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const translateY = useSharedValue(0);
    const context = useSharedValue(0);
    const MINIMUM_HEIGHT = useSharedValue(0)

    const updateIsExpanded = useCallback((value: boolean) => {
        setIsExpanded(value);
    }, []);

    const snapTo = useCallback((point: number) => {
        'worklet';
        translateY.value = withSpring(point, SPRING_CONFIG);
        runOnJS(updateIsExpanded)(point === -MAXIMUM_HEIGHT + MINIMUM_HEIGHT.value);
    }, []);

    const pan = Gesture.Pan()
        .onStart(() => {
            context.value = translateY.value;
        })
        .onUpdate((event) => {
            const newTranslateY = context.value + event.translationY;
            // Limitamos el movimiento entre el mínimo y máximo
            translateY.value = Math.max(
                -MAXIMUM_HEIGHT + MINIMUM_HEIGHT.value,
                Math.min(0, newTranslateY)
            );
        })
        .onEnd((event) => {
            const velocity = event.velocityY;
            const shouldExpand =
                velocity < -500 || // Gesto rápido hacia arriba
                (velocity > -500 && velocity < 500 && translateY.value < -MINIMUM_HEIGHT.value / 2); // Gesto lento pero pasó la mitad

            if (shouldExpand) {
                snapTo(-MAXIMUM_HEIGHT + MINIMUM_HEIGHT.value);
            } else {
                snapTo(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        };
    });

    const handlePressIndicator = useCallback(() => {
        if (isExpanded) {
            snapTo(0);
        } else {
            snapTo(-MAXIMUM_HEIGHT + MINIMUM_HEIGHT.value);
        }
    }, [isExpanded, snapTo]);

    return (
        <View
            style={styles.container}
            onLayout={(event) => {
                MINIMUM_HEIGHT.value = event.nativeEvent.layout.height
            }}
        >
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.containerList, animatedStyle]}>
                    <Pressable
                        onPress={handlePressIndicator}
                        style={styles.dragIndicator}>
                        <View style={styles.dragBar} />
                    </Pressable>
                    <View style={styles.content}>
                        {children}
                    </View>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    containerList: {
        backgroundColor: COLORS.white,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        ...SHADOW_DEFAULT,
        height: HEIGHT_SCREEN,
        width: '100%',
        position: 'absolute',
    },
    dragIndicator: {
        width: '100%',
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dragBar: {
        width: 52,
        height: 5,
        borderRadius: 999,
        backgroundColor: COLORS.lines,
    },
    content: {
        flex: 1,
    }
});