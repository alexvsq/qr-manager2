import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { ScannedHistoryData } from '@/types/types'
import { Image } from 'expo-image'
import TextComponent from '@/components/ui/TextComponent'
import { COLORS } from '@/utils/constants'
import { UpdateNotesOfScannedHistory } from '@/functions/sql/setData'
import Web from '@/components/InfoEdit/Kinds/Web'
import Wifi from '@/components/InfoEdit/Kinds/Wifi'

export default function Principal({ item }: { item: ScannedHistoryData }) {

    if (item.type === 'wifi') {
        return <Wifi item={item} />
    } if (item.type === 'web') {
        return <Web />
    }
    return (
        <View>
            <Text>Principal</Text>
        </View>
    )

}


