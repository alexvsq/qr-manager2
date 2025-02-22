import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import { useCameraStore } from '@/store/cameraStore'
import { router } from 'expo-router'

export function IndexBtns() {

    const ToggleFlash = useCameraStore((state) => state.toggleFlash)
    const ToggleFacing = useCameraStore((state) => state.toggleFacing)

    return (
        <View style={{ flexDirection: 'row', gap: 16, marginRight: 12 }}>

            < BtnCircle image={require('@/assets/icons/camera-switch.png')} FuncPress={ToggleFacing} />

            < BtnCircle image={require('@/assets/icons/flash.png')} FuncPress={ToggleFlash} />

        </View>
    )
}

export const SearchHistoryBtn = () => {

    const handlePress = () => {
        router.push({
            pathname: '/search/[typehistory]',
            params: { typehistory: 'scanned' }
        })
    }

    return (
        <TouchableOpacity
            onPressIn={handlePress}
        >
            <View style={[styles.conatinnerBtn, { marginRight: 12 }]}>
                <Image
                    source={require('@/assets/icons/search.png')}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
        </TouchableOpacity>
    )
}

export const BtnCircle = ({ image, FuncPress }: { image: any, FuncPress: () => void }) => {
    return (
        <TouchableOpacity
            onPressIn={FuncPress}
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