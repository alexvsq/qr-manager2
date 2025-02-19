import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'
import Background from '@/components/ui/Background-Page'
import { GetOneScannedHistory } from '@/functions/sql/getData'
import { ScannedHistoryData } from '@/types/types'
import QRCode from "react-qr-code";
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import ListDynamic from '@/components/ListDynamic'
import IconImage from '@/components/IconImage'
import TextComponent from '@/components/ui/TextComponent'
import { BtnCircle } from '@/components/BtnsHeader'
import PrincipalKind from '@/components/InfoEdit/Principal'
import { useTranslation } from 'react-i18next'
import { InputNotes } from '@/components/InfoEdit/components/components'

const WIDTH_SCREEN = Dimensions.get('screen').width

export default function id() {

    const { t } = useTranslation()
    const { id } = useLocalSearchParams()

    const [data, setData] = useState<ScannedHistoryData | null>(null)

    const getData = async () => {
        const data = await GetOneScannedHistory(Number(id))
        setData(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitleAlign: 'center',
                    title: t('title.details'),
                    headerRight: () => <IconImage item={data} />
                }}
            />
            <Background>
                {
                    data ?
                        <View style={{ flex: 1 }}>
                            <View style={styles.qrContainer}>
                                <View style={styles.qr}>
                                    <QRCode
                                        size={250}
                                        value={data.value}
                                    />
                                </View>
                            </View>

                            <View style={styles.containerDates}>
                                <TextComponent typeText='graySmall'>{new Date(data.timeStamp).toLocaleTimeString()}</TextComponent>
                                <TextComponent typeText='graySmall'>{new Date(data.timeStamp).toLocaleDateString()}</TextComponent>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 50, justifyContent: 'center', marginBottom: 15 }}>
                                <BtnCircle image={require('@/assets/icons/color.png')} onPress={() => { }} />
                                <BtnCircle image={require('@/assets/icons/download.png')} onPress={() => { }} />
                                <BtnCircle image={require('@/assets/icons/share.png')} onPress={() => { }} />
                            </View>

                            <ListDynamic>
                                <ScrollView style={{ paddingHorizontal: 25, paddingBottom: 20 }}>
                                    <PrincipalKind item={data} />
                                </ScrollView>
                            </ListDynamic>
                        </View>
                        :
                        <TextComponent>asdfasd</TextComponent>
                }

            </Background>
        </>
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
        justifyContent: 'space-around',
        marginVertical: 10
    }
})