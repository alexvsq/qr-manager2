import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import { ScannedHistoryData, } from '@/types/types'
import { Image } from 'expo-image'
import { SCANNED_TYPES } from '@/utils/types'
import { router } from 'expo-router'
import TextComponent from '@/components/ui/TextComponent'

export default function CardHistory({ item }: { item: ScannedHistoryData }) {

    const handlePress = () => {
        router.push({
            pathname: '/detailsScanned/[id]',
            params: { id: item.id }
        })
    }

    const Icon = SCANNED_TYPES.find((type) => type.codeId === item.type)

    const Name = item.name.length > 16 ? item.name.slice(0, 16) + "..." : item.name
    const Value = item.value.length > 30 ? item.value.slice(0, 30) + "..." : item.value

    const HourItem = new Date(item.timeStamp).toLocaleTimeString()

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={styles.container}>

            {/* COL 1 */}
            <View style={{ width: 35, height: 35, padding: 4, backgroundColor: Icon?.color, borderRadius: 999 }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={Icon?.iconImg}
                    contentFit='contain'
                />
            </View>


            {/* COL 2 */}
            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <TextComponent typeText='titleCard' >{Name}</TextComponent>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: Icon?.color, fontSize: 13 }} >{item.type}</Text>
                        </View>

                        <TextComponent typeText='graySmall' >{HourItem}</TextComponent>
                    </View>
                </View>

                <TextComponent typeText='graySmall' >{Value}</TextComponent>
            </View>

            {/* COL 3 */}

            <View style={{ width: 13, height: 13, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('@/assets/icons/arrow.png')}
                    style={{ width: '100%', height: '100%' }}
                    contentFit='contain'
                />
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 20,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        // ...SHADOW_DEFAULT
    },
})