import { View, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import GenerateQr from '@/functions/GenerateDataQr'
import { COLORS } from '@/utils/constants'
import TextComponent from '@/components/ui/TextComponent'
import { useTranslation } from 'react-i18next'
import { useCreatedHistory } from '@/hooks/useCreatedHistory'
import { router } from 'expo-router'
import { BtnCreateQr } from '@/components/creteQr/Components'

export default function Email() {

    const { t } = useTranslation()
    const Generate = new GenerateQr()
    const { AddInCreatedListHistory } = useCreatedHistory()

    const [dataEmail, setDataEmail] = useState({
        to: '',
        subject: '',
        body: '',
    })

    const CreateAndGoToQr = async () => {
        const newQr = Generate.generateEmail(dataEmail.to, dataEmail.subject, dataEmail.body)
        console.log(newQr);

        const newID = await AddInCreatedListHistory(newQr, 'email')
        if (!newID) throw new Error('newID is null')
        router.push({
            pathname: '/detailsScanned/[typehistory]/[id]',
            params: { typehistory: 'created', id: newID }
        })
    }


    return (
        <View>
            <TextComponent typeText='graySmall' >{t('email.to')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                placeholder="example@gmail.com"
                keyboardType='email-address'
                autoCapitalize='none'
                value={dataEmail.to}
                onChangeText={(text) => setDataEmail({ ...dataEmail, to: text })}
            />
            <TextComponent typeText='graySmall' >{t('email.subject')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                placeholder="Subject"
                value={dataEmail.subject}
                onChangeText={(text) => setDataEmail({ ...dataEmail, subject: text })}
            />
            <TextComponent typeText='graySmall' >{t('email.body')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                placeholder="Body"
                value={dataEmail.body}
                onChangeText={(text) => setDataEmail({ ...dataEmail, body: text })}
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