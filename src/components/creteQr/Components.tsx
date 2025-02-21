import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS } from '@/utils/constants'
import TextComponent from '@/components/ui/TextComponent'

export const BtnCreateQr = ({ handlePress }: { handlePress: () => void }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPressIn={handlePress}
        >
            <TextComponent typeText='white' >Create Qr</TextComponent>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.blackBg,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
})