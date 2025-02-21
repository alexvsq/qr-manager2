import { View, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import GenerateQr from '@/functions/GenerateDataQr'
import { COLORS } from '@/utils/constants'
import TextComponent from '@/components/ui/TextComponent'
import { useTranslation } from 'react-i18next'
import { useCreatedHistory } from '@/hooks/useCreatedHistory'
import { router } from 'expo-router'
import { BtnCreateQr } from '@/components/creteQr/Components'

export default function wifi() {

    const { t } = useTranslation()
    const { AddInCreatedListHistory } = useCreatedHistory()
    const Generate = new GenerateQr()

    const [notesUser, setNotesUser] = useState('')
    const [DataWifi, setDataWifi] = useState({
        ssid: '',
        password: '',
    })

    const CreateAndGoToQr = async () => {
        const newQr = Generate.generateWifi(DataWifi.ssid, DataWifi.password)
        const newID = await AddInCreatedListHistory(newQr, 'wifi', notesUser)
        if (!newID) throw new Error('newID is null')
        router.push({
            pathname: '/detailsScanned/[typehistory]/[id]',
            params: { typehistory: 'created', id: newID }
        })
    }

    return (
        <View>
            <TextComponent typeText='graySmall' >{t('wifi.name')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                placeholder="SSID"
                value={DataWifi.ssid}
                onChangeText={(text) => setDataWifi({ ...DataWifi, ssid: text })}
            />

            <TextComponent typeText='graySmall' >{t('wifi.password')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                placeholder="Password"
                value={DataWifi.password}
                onChangeText={(text) => setDataWifi({ ...DataWifi, password: text })}
            />

            <TextComponent typeText='graySmall' >{t('notes.title')}</TextComponent>

            <TextInput
                style={styles.InputStyle}
                placeholder={t("notes.placeholder")}
                value={notesUser}
                onChangeText={setNotesUser}
            />


            <View >

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