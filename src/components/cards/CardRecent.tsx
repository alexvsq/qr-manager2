import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import { ScannedHistoryData } from '@/types/types'
import { SCANNED_TYPES } from '@/utils/types'
import TextComponent from '@/components/ui/TextComponent';

interface Props {
    item: ScannedHistoryData
    handlePress: () => void
}

export default function cardRecent({ item, handlePress }: Props) {

    const Icon = SCANNED_TYPES.find((type) => type.codeId === item.type)
    const Name = item.name.length > 18 ? item.name.slice(0, 18) + "..." : item.name
    const ValueClear = item.value.trim().replace(/\n/g, '')
    const Value = ValueClear.length > 30 ? ValueClear.slice(0, 30) + "..." : ValueClear

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={styles.container}
        >
            <Image
                style={{ width: 32, height: 32 }}
                source={Icon?.iconImg}
                contentFit='contain'
                tintColor={Icon?.color}
            />

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <TextComponent typeText='titleCard'>{Name}</TextComponent>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: Icon?.color, fontSize: 13 }} >{item.type}</Text>
                </View>
                <TextComponent typeText='graySmall' >{Value}</TextComponent>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        alignItems: 'center',
        gap: 12,
    },
})