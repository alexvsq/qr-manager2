import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'
import { GetOneScannedHistory, GetOneCreatedHistory } from '@/functions/sql/getData'
import { ScannedHistoryData } from '@/types/types'
import { COLORS } from '@/utils/constants'
import ListDynamic from '@/components/ListDynamic'
import IconImage from '@/components/IconImage'
import TextComponent from '@/components/ui/TextComponent'
import DecodeInfoToShow from '@/components/InfoEdit/DecodeInfoToShow'
import { useTranslation } from 'react-i18next'
import { useScannedHistory } from '@/hooks/useScannedHistory'
import { router } from 'expo-router'
import { useCreatedHistory } from '@/hooks/useCreatedHistory'
import QrComponent from '@/components/QrComponent'

export default function id() {

    const { t } = useTranslation()
    const { id, typehistory } = useLocalSearchParams()
    const { DeleteScannedHistory } = useScannedHistory()
    const { DeleteCreatedHistory } = useCreatedHistory()

    const [data, setData] = useState<ScannedHistoryData | null>(null)

    const TypeHistory = typehistory == 'scanned' ? 'scanned' : 'created'

    const HandleDelete = async () => {
        try {
            if (TypeHistory == 'scanned') {
                await DeleteScannedHistory(Number(id))
            }
            if (TypeHistory == 'created') {
                await DeleteCreatedHistory(Number(id))
            }
            router.back()
        } catch (error) {
            console.error('HandleDelete', error)
        }
    }

    const getData = async () => {
        if (TypeHistory == 'scanned') {
            const data = await GetOneScannedHistory(Number(id))
            setData(data)
        }
        if (TypeHistory == 'created') {
            const data = await GetOneCreatedHistory(Number(id))
            setData(data)
        }
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
                    headerRight: () => <IconImage item={data?.type} />,
                    contentStyle: {
                        backgroundColor: COLORS.whiteBg
                    }
                }}
            />
            {
                data ?
                    <View style={{ flex: 1 }}>

                        <QrComponent
                            data={data}
                            DeleteFunction={HandleDelete}
                        />


                        <ListDynamic>

                            <View style={{ paddingHorizontal: 25, paddingBottom: 20 }}>

                                <DecodeInfoToShow
                                    typeHistory={TypeHistory}
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
