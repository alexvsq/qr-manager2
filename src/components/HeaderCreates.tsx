import { View, Image, TouchableOpacity } from "react-native";
import TextComponent from "./ui/TextComponent";
import { useTranslation } from 'react-i18next'
import { router } from "expo-router";

export default function headerCardCreate() {

    const { t } = useTranslation()

    const handlePress = () => {
        router.push({
            pathname: '/search/[typehistory]',
            params: { typehistory: 'created' }
        })
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <TextComponent typeText="titleCard" >{t('recent')}</TextComponent>
            </View>
            <TouchableOpacity onPress={handlePress}>
                <TextComponent typeText="graySmall" >{t('viewAll')}</TextComponent>
            </TouchableOpacity>
        </View>
    )
}