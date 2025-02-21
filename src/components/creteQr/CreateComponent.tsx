import { View, Text, StyleSheet } from 'react-native'
import { COLORS, PADDING_HORIZONTAL, SHADOW_DEFAULT } from '@/utils/constants'
import Wifi from '@/components/creteQr/TypesQr/wifi'
import Web from '@/components/creteQr/TypesQr/Web'
import Contact from '@/components/creteQr/TypesQr/Contact'

export default function CreateComponent({ type }: { type: string }) {

    return (
        <View style={styles.container}>
            {
                type == 'wifi' && <Wifi />
            }
            {
                type == 'web' && <Web />
            }
            {
                type == 'contact' && <Contact />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingVertical: 20,
        borderRadius: 20,
        marginVertical: 10,
        ...SHADOW_DEFAULT
    }
})