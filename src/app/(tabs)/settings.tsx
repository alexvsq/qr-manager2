import { View, Text, Button } from 'react-native'
import { deleteall } from '@/functions/sql/setData'
import { GetScannedAllRows } from '@/functions/sql/getData'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

export default function settings() {

    const { t } = useTranslation()

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')
    }

    const init = async () => {
        const data = await GetScannedAllRows()
        console.log(data);
    }

    const deleteRows = async () => {
        await deleteall()
    }

    return (
        <View>
            <Text>settings</Text>

            <Text style={{ fontSize: 20 }}>{t('Welcome to React')}</Text>

            <Button title="CHANGE LANGUAGE TEST" onPress={toggleLanguage} />

            <Button title="Show Data in Console" onPress={init} />

            <Button title="DELETE Data" onPress={deleteRows} />
        </View>
    )
}