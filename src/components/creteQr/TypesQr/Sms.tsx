import { View, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import GenerateQr from '@/functions/GenerateDataQr'
import { COLORS } from '@/utils/constants'
import TextComponent from '@/components/ui/TextComponent'
import { useTranslation } from 'react-i18next'
import { useCreatedHistory } from '@/hooks/useCreatedHistory'
import { router } from 'expo-router'
import { BtnCreateQr } from '@/components/creteQr/Components'

export default function Sms() {

    const { t } = useTranslation()
    const Generate = new GenerateQr()
    const { AddInCreatedListHistory } = useCreatedHistory()

    const [dataSms, setDataSms] = useState({
        phoneNumber: '',
        message: '',
    })

    const CreateAndGoToQr = async () => {
        const newQr = Generate.generateSms(dataSms.phoneNumber, dataSms.message)
        console.log(newQr);

        const newID = await AddInCreatedListHistory(newQr, 'sms')
        if (!newID) throw new Error('newID is null')
        router.push({
            pathname: '/detailsScanned/[typehistory]/[id]',
            params: { typehistory: 'created', id: newID }
        })
    }

    return (
        <View>
            <TextComponent>{t('sms.phoneNumber')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                placeholder="+123456789"
                keyboardType='numeric'
                value={dataSms.phoneNumber}
                onChangeText={(text) => setDataSms({ ...dataSms, phoneNumber: text })}
            />
            <TextComponent>{t('sms.message')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                placeholder="Message"
                value={dataSms.message}
                onChangeText={(text) => setDataSms({ ...dataSms, message: text })}
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