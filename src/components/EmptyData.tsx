import { View, Text } from 'react-native'
import TextComponent from './ui/TextComponent'
import { useTranslation } from 'react-i18next'

export default function EmptyData() {

    const { t } = useTranslation()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <TextComponent typeText='titleCard' >{t('empty.history')}</TextComponent>
        </View>
    )
}