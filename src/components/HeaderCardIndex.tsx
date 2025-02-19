import { View, Image, TouchableOpacity } from "react-native";
import TextComponent from "./ui/TextComponent";
import { useTranslation } from 'react-i18next'

export default function headerCardIndex() {

    const { t } = useTranslation()

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
            <TouchableOpacity>
                <TextComponent typeText="gray" >{t('viewAll')}</TextComponent>
            </TouchableOpacity>
        </View>
    )
}