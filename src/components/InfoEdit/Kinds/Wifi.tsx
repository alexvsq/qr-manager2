import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { getWifiData } from '@/functions/OrderData'
import DivisorLine from '@/components/ui/DivisorLine'
import { InfoTitleAndText, InputNotes } from '@/components/InfoEdit/components/components'
import { ScannedHistoryData } from '@/types/types'
import { UpdateNotesOfScannedHistory } from '@/functions/sql/setData'

export default function Wifi({ item }: { item: ScannedHistoryData }) {

    const DataOfValue = getWifiData(item.value)

    return (
        <View>

            <InfoTitleAndText
                title='Nombre de la red'
                text={DataOfValue.name}
            />

            <DivisorLine />

            <InfoTitleAndText
                title='Contraseña'
                text={DataOfValue.password}
            />

            <DivisorLine />

            <InfoTitleAndText
                title='Seguridad'
                text={DataOfValue.security}
            />

            <DivisorLine />

            <InfoTitleAndText
                title='Visible'
                text={DataOfValue.hidden}
            />

            <DivisorLine />

            <InputNotes
                id={item.id}
            />
        </View>
    )
}