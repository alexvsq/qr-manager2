import { View, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import GenerateQr from '@/functions/GenerateDataQr'
import { COLORS } from '@/utils/constants'
import TextComponent from '@/components/ui/TextComponent'
import { useTranslation } from 'react-i18next'
import { useCreatedHistory } from '@/hooks/useCreatedHistory'
import { router } from 'expo-router'
import { BtnCreateQr } from '@/components/creteQr/Components'

export default function Number() {

    const { t } = useTranslation()
    const Generate = new GenerateQr()
    const { AddInCreatedListHistory } = useCreatedHistory()

    const [dataNumber, setDataNumber] = useState('')

    const CreateAndGoToQr = async () => {
        const newQr = Generate.generateTel(dataNumber)
        console.log(newQr);

        const newID = await AddInCreatedListHistory(newQr, 'number')
        if (!newID) throw new Error('newID is null')
        router.push({
            pathname: '/detailsScanned/[typehistory]/[id]',
            params: { typehistory: 'created', id: newID }
        })
    }

    return (
        <View>
            <TextComponent typeText='graySmall' >{t('number.title')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                placeholder="+123456789"
                keyboardType='numeric'
                value={dataNumber}
                onChangeText={(text) => setDataNumber(text)}
            />
            <View>
                <BtnCreateQr
                    handlePress={CreateAndGoToQr}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    InputStyle: {
        backgroundColor: COLORS.bgSecondary,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        minHeight: 40,
        borderColor: COLORS.lines,
        marginVertical: 10
    }
})