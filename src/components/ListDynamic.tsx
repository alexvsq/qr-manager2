import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useState, ReactNode } from 'react';
import { COLORS, SHADOW_DEFAULT } from "@/utils/constants";

const HEIGHT_SCREEN = Dimensions.get('screen').height;
const SPRING_CONFIG_FAST = {
    damping: 12,     // Menor amortiguación = más rebote
    stiffness: 200,  // Mayor rigidez = más velocidad
    mass: 1,       // Menor masa = más velocidad
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
};

export default function ListDynamic({ children }: { children: ReactNode }) {

    const pressed = useSharedValue(false);
    const isOpen = useSharedValue(false);

    const HeightListInit = useSharedValue(0);
    const HeightList = useSharedValue(0);

    const pan = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            const newHeight = HeightListInit.value - event.translationY;
            if (newHeight >= 0 && newHeight <= HEIGHT_SCREEN * 0.8) {
                HeightList.value = newHeight;
            }
        })
        .onFinalize(() => {
            pressed.value = false;
            if (HeightList.value > HEIGHT_SCREEN / 2.3) {
                HeightList.value = withSpring(HEIGHT_SCREEN * 0.7, SPRING_CONFIG_FAST);
                isOpen.value = true;
            } else {
                HeightList.value = withSpring(HeightListInit.value, SPRING_CONFIG_FAST);
                isOpen.value = false;
            }
        });

    const HeightAnimated = useAnimatedStyle(() => {
        return {
            height: HeightList.value
        };
    });

    return (
        <View
            style={{ flex: 1 }}
            onLayout={(e) => {
                HeightListInit.value = e.nativeEvent.layout.height;
                HeightList.value = withTiming(e.nativeEvent.layout.height);
            }}
        >
            <Animated.View
                style={[styles.containerList, HeightAnimated]}
            >
                <GestureDetector gesture={pan}>
                    <Animated.View style={{ width: '100%', height: 28, alignItems: 'center', justifyContent: 'center' }}>
                        <Animated.View style={{ width: 52, height: 5, borderRadius: 999, backgroundColor: COLORS.lines }} />
                    </Animated.View>
                </GestureDetector>
                {children}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerList: {
        backgroundColor: COLORS.white,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        ...SHADOW_DEFAULT,
        position: 'absolute',
        width: '100%',
        bottom: 0
    }
})