import { View } from 'react-native'
import { Image } from 'expo-image'
import { ScannedHistoryData } from '@/types/types'
import { SCANNED_TYPES } from '@/utils/types'

export default function IconImage({ item }: { item: ScannedHistoryData | null }) {

    if (!item) return null

    const Icon = SCANNED_TYPES.find((type) => type.codeId === item.type)

    return (
        <View style={{ width: 35, height: 35, padding: 4, backgroundColor: Icon?.color, borderRadius: 999 }}>
            <Image
                source={Icon?.iconImg}
                style={{ width: '100%', height: '100%', }}
                contentFit='contain'
            />
        </View>
    )
}