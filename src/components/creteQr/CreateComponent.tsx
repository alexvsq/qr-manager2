import { View, Text, StyleSheet } from 'react-native'
import { COLORS, PADDING_HORIZONTAL, SHADOW_DEFAULT } from '@/utils/constants'
import Wifi from '@/components/creteQr/TypesQr/wifi'
import Web from '@/components/creteQr/TypesQr/Web'
import Contact from '@/components/creteQr/TypesQr/Contact'
import Email from '@/components/creteQr/TypesQr/Email'
import Number from '@/components/creteQr/TypesQr/Number'
import Sms from '@/components/creteQr/TypesQr/Sms'
import TextQr from '@/components/creteQr/TypesQr/TextQr'

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
            {
                type == 'email' && <Email />
            }
            {
                type == 'number' && <Number />
            }
            {
                type == 'sms' && <Sms />
            }
            {
                type == 'text' && <TextQr />
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