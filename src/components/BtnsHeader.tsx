import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import { useCameraStore } from '@/store/cameraStore'

export function IndexBtns() {

    const ToggleFlash = useCameraStore((state) => state.toggleFlash)
    const ToggleFacing = useCameraStore((state) => state.toggleFacing)

    return (
        <View style={{ flexDirection: 'row', gap: 16, marginRight: 12 }}>

            < BtnCircle image={require('@/assets/icons/camera-switch.png')} onPress={ToggleFacing} />

            < BtnCircle image={require('@/assets/icons/flash.png')} onPress={ToggleFlash} />

        </View>
    )
}

export const BtnCircle = ({ image, onPress }: { image: any, onPress: () => void }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={styles.conatinnerBtn}>
                <Image
                    source={image}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    conatinnerBtn: {
        backgroundColor: COLORS.white,
        borderRadius: 999,
        width: 38,
        height: 38,
        padding: 8,
        ...SHADOW_DEFAULT
    }
})