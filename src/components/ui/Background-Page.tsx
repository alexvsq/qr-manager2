import { View, Text } from 'react-native'
import { COLORS } from '@/utils/constants'
import { ReactNode } from 'react'

export default function Background({ children }: { children: ReactNode }) {
    return (
        <View style={{ backgroundColor: COLORS.whiteBg, flex: 1, borderBottomRightRadius: 40, borderBottomLeftRadius: 40, overflow: 'hidden' }}>
            {children}
        </View>
    )
}