import { Text, View, Image, TouchableOpacity } from "react-native";
import { COLORS } from '@/utils/constants'

export default function headerCardIndex() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Image
                    source={require('@/assets/icons/history.png')}
                    style={{ width: 22, height: 22, }}
                    resizeMode="contain"
                />
                <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Recent</Text>
            </View>
            <TouchableOpacity>
                <Text style={{ color: COLORS.textGray }} >View All</Text>
            </TouchableOpacity>
        </View>
    )
}