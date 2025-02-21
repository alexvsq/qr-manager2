import { View, TextInput } from 'react-native'
import { useState } from 'react'
import CreateQr from '@/functions/GenerateDataQr'
import { COLORS } from '@/utils/constants'
import TextComponent from '@/components/ui/TextComponent'
import { useTranslation } from 'react-i18next'
import { BtnCreateQr } from '@/components/creteQr/Components'
import { useCreatedHistory } from '@/hooks/useCreatedHistory'
import { router } from 'expo-router'

export default function Web() {

    const { t } = useTranslation()
    const Generate = new CreateQr()
    const { AddInCreatedListHistory } = useCreatedHistory()

    const [dataWeb, setDataWeb] = useState('')

    const CreateAndGoToQr = async () => {
        const newQr = Generate.generateUrl(dataWeb)
        const newID = await AddInCreatedListHistory(newQr, 'url')
        if (!newID) throw new Error('newID is null')
        router.push({
            pathname: '/detailsScanned/[typehistory]/[id]',
            params: { typehistory: 'created', id: newID }
        })
    }

    return (
        <View>
            <TextComponent typeText='graySmall' >{t('url.title')}</TextComponent>
            <TextInput
                style={{ backgroundColor: COLORS.bgSecondary, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: COLORS.lines }}
                placeholder="URL"
                value={dataWeb}
                onChangeText={(text) => setDataWeb(text)}
                autoCapitalize='none'
            />

            <View>
                <BtnCreateQr
                    handlePress={CreateAndGoToQr}
                />
            </View>

        </View>
    )
}