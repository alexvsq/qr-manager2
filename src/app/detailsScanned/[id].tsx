import { View, Dimensions, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'
import { GetOneScannedHistory } from '@/functions/sql/getData'
import { ScannedHistoryData } from '@/types/types'
import QRCode from "react-qr-code";
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import ListDynamic from '@/components/ListDynamic'
import IconImage from '@/components/IconImage'
import TextComponent from '@/components/ui/TextComponent'
import { BtnCircle } from '@/components/BtnsHeader'
import DecodeInfoToShow from '@/components/InfoEdit/DecodeInfoToShow'
import { useTranslation } from 'react-i18next'
import { useScannedHistory } from '@/hooks/useScannedHistory'
import { router } from 'expo-router'
import Animated, { FlipInEasyX } from 'react-native-reanimated'

const WIDTH_SCREEN = Dimensions.get('screen').width

export default function id() {

    const { t } = useTranslation()
    const { id } = useLocalSearchParams()
    const { DeleteScannedHistory } = useScannedHistory()

    const [data, setData] = useState<ScannedHistoryData | null>(null)

    const HandleDelete = async () => {
        try {
            await DeleteScannedHistory(Number(id))
            router.back()
        } catch (error) {
            console.error('HandleDelete', error)
        }
    }

    const getData = async () => {
        const data = await GetOneScannedHistory(Number(id))
        setData(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (

        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerTitleAlign: 'center',
                    title: t('title.details'),
                    headerRight: () => <IconImage item={data} />,
                    contentStyle: {
                        backgroundColor: COLORS.whiteBg
                    }
                }}
            />
            {
                data ?
                    <View style={{ flex: 1 }}>
                        <Animated.View entering={FlipInEasyX} style={styles.qrContainer}>
                            <View style={styles.qr}>
                                <QRCode
                                    size={250}
                                    value={data.value}
                                />
                            </View>
                        </Animated.View>

                        <View style={styles.containerDates}>
                            <TextComponent typeText='graySmall'>{new Date(data.timeStamp).toLocaleTimeString()}</TextComponent>
                            <TextComponent typeText='graySmall'>{data.barcodeType}</TextComponent>
                            <TextComponent typeText='graySmall'>{new Date(data.timeStamp).toLocaleDateString()}</TextComponent>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 40, justifyContent: 'center', marginBottom: 15 }}>
                            <BtnCircle image={require('@/assets/icons/trash.png')} FuncPress={HandleDelete} />
                            <BtnCircle image={require('@/assets/icons/color.png')} FuncPress={() => { }} />
                            <BtnCircle image={require('@/assets/icons/download.png')} FuncPress={() => { }} />
                            <BtnCircle image={require('@/assets/icons/share.png')} FuncPress={() => { }} />
                        </View>

                        <ListDynamic>

                            <View style={{ paddingHorizontal: 25, paddingBottom: 20 }}>

                                <DecodeInfoToShow
                                    item={data}
                                />

                            </View>

                        </ListDynamic>
                    </View>
                    :
                    <TextComponent>{t('loading')}</TextComponent>
            }

        </View >
    )
}

const styles = StyleSheet.create({
    qrContainer: {
        width: WIDTH_SCREEN,
        maxHeight: 500,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qr: {
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        ...SHADOW_DEFAULT
    },
    containerDates: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
        marginVertical: 10
    }
})