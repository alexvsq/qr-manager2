import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import { ScannedHistoryData } from '@/types/types'
import { SCANNED_TYPES } from '@/utils/types'
import TextComponent from '@/components/ui/TextComponent';
import { router } from 'expo-router'

export default function cardRecentIndex(item: ScannedHistoryData) {

    const handlePress = () => {
        router.push({
            pathname: '/detailsScanned/[id]',
            params: { id: item.id }
        })
    }

    const Icon = SCANNED_TYPES.find((type) => type.codeId === item.type)

    const Name = item.name.length > 18 ? item.name.slice(0, 18) + "..." : item.name
    const Value = item.value.length > 30 ? item.value.slice(0, 30) + "..." : item.value

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={styles.container}
        >

            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>

                <Image
                    style={{ width: 32, height: 32 }}
                    source={Icon?.iconImg}
                    contentFit='contain'
                    tintColor={Icon?.color}
                />

                <View >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <TextComponent typeText='titleCard'>{Name}</TextComponent>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: Icon?.color, fontSize: 13 }} >{item.type}</Text>
                    </View>
                    <TextComponent typeText='graySmall' >{Value}</TextComponent>
                </View>
            </View>

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
        flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'center',
    },
})