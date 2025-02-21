import { View, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import CreateQr from '@/functions/GenerateDataQr'
import { COLORS } from '@/utils/constants'
import TextComponent from '@/components/ui/TextComponent'
import { useTranslation } from 'react-i18next'
import { BtnCreateQr } from '@/components/creteQr/Components'
import { useCreatedHistory } from '@/hooks/useCreatedHistory'
import { router } from 'expo-router'

export default function Contact() {

    const { t } = useTranslation()
    const Generate = new CreateQr()
    const { AddInCreatedListHistory } = useCreatedHistory()

    const [dataContact, setDataContact] = useState({
        firstName: "",
        lastName: "",
        organization: "",
        title: "",
        email: "",
        phone: "",
        address: "",
        website: "",
    })

    const CreateAndGoToQr = async () => {
        const newQr = Generate.generateVCard(dataContact)
        console.log(newQr);

        const newID = await AddInCreatedListHistory(newQr, 'contact')
        if (!newID) throw new Error('newID is null')
        router.push({
            pathname: '/detailsScanned/[typehistory]/[id]',
            params: { typehistory: 'created', id: newID }
        })
    }


    return (
        <View>
            <TextComponent typeText='graySmall' >{t('contact.fullName')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                onChangeText={(text) => setDataContact({ ...dataContact, firstName: text })}
                value={dataContact.firstName}
            />
            <TextComponent typeText='graySmall' >{t('contact.organization')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                onChangeText={(text) => setDataContact({ ...dataContact, organization: text })}
                value={dataContact.organization}
            />
            <TextComponent typeText='graySmall' >{t('contact.title')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                onChangeText={(text) => setDataContact({ ...dataContact, title: text })}
                value={dataContact.title}
            />
            <TextComponent typeText='graySmall' >{t('contact.homePhone')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                onChangeText={(text) => setDataContact({ ...dataContact, phone: text })}
                value={dataContact.phone}
            />
            <TextComponent typeText='graySmall' >{t('contact.email')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                placeholder="example@gmail.com"
                onChangeText={(text) => setDataContact({ ...dataContact, email: text })}
                value={dataContact.email}
            />
            <TextComponent typeText='graySmall' >{t('contact.address')}</TextComponent>
            <TextInput
                style={styles.InputStyle}
                onChangeText={(text) => setDataContact({ ...dataContact, address: text })}
                value={dataContact.address}
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