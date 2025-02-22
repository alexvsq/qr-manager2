import { View, Linking } from 'react-native'
import IconImage from '@/components/IconImage'
import { ScannedHistoryData } from '@/types/types'
import { BtnCircle } from '@/components/BtnsHeader'
import TextComponent from '@/components/ui/TextComponent'
import { getSMSData } from '@/functions/OrderData'

export default function HeaderScannedModal({ info }: { info: ScannedHistoryData | null }) {

    if (!info) return null

    const supportTypesLink = ['email', 'number', 'sms', 'web', 'url',]
    const noSupportTypesLink = ['contact', 'bar', 'wifi', 'text']
    /* 
    ---https://reactnative.dev/docs/linking?language=javascript---
    mailto	Open mail app, eg: mailto: support@expo.io	
    tel	Open phone app, eg: tel:+123456789	
    sms	Open SMS app, eg: sms:+123456789	
    https / http	Open web browser app, eg: https://expo.io
    */
    const handlePress = () => {
        if (info.type == 'sms') {
            const data = getSMSData(info.value)
            Linking.openURL(`sms:${data.phoneNumber}`)
            return
        }
        if (supportTypesLink.includes(info.type)) {
            console.log(info.value)
            Linking.openURL(info.value)
        }
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconImage item={info?.type} />
            {
                !noSupportTypesLink.includes(info.type)
                    ? <BtnCircle
                        image={require('@/assets/icons/open-black.png')}
                        FuncPress={handlePress}
                    />
                    : <TextComponent typeText='graySmall' >{info?.type}</TextComponent>
            }
        </View>
    )
}