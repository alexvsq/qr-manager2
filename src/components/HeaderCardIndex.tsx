import { View, Image, TouchableOpacity } from "react-native";
import TextComponent from "./ui/TextComponent";
import { useTranslation } from 'react-i18next'
import { router } from "expo-router";

export default function headerCardIndex() {

    const { t } = useTranslation()

    const handlePress = () => {
        router.push('./history')
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Image
                    source={require('@/assets/icons/history.png')}
                    style={{ width: 22, height: 22, }}
                    resizeMode="contain"
                />
                <TextComponent typeText="titleCard" >{t('recent')}</TextComponent>
            </View>
            <TouchableOpacity onPress={handlePress}>
                <TextComponent typeText="graySmall" >{t('viewAll')}</TextComponent>
            </TouchableOpacity>
        </View>
    )
}