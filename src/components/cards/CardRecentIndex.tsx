import { COLORS } from '@/utils/constants'
import { View, Text } from 'react-native'
import { Image } from 'expo-image';
import { ScannedHistoryData } from '@/types/types'
import { returnType } from '@/functions/OrderData'
import { SCANNED_TYPES } from '@/utils/types'

export default function cardRecentIndex(item: ScannedHistoryData) {

    const Type = returnType(item.value)
    const Icon = SCANNED_TYPES.find((type) => type.codeId === Type)

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'center' }}>

            <View style={{ flexDirection: 'row', gap: 10, alignContent: 'center' }}>

                <Image
                    style={{ width: 32, height: 32, }}
                    source={Icon?.iconImg}
                    contentFit='contain'
                    tintColor={Icon?.color}
                />

                <View >
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Alex Vasquez</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: COLORS.textGray, fontSize: 13 }} >User</Text>
                </View>
            </View>

            <View style={{ width: 13, height: 13, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('@/assets/icons/arrow.png')}
                    style={{ width: '100%', height: '100%' }}
                    contentFit='contain'
                />
            </View>

        </View>
    )
}
