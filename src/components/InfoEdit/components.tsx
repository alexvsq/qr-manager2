import { View, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import TextComponent from '@/components/ui/TextComponent'
import { copyToClipboard } from '@/functions/functions'

export const InfoTitleAndText = ({ title, text }: { title: string, text: string | null | undefined }) => {
    if (!text || text == "") return null

    const CopyText = async () => {
        await copyToClipboard(text)
    }

    const TextCut = text.length > 60 ? text.slice(0, 60) + "..." : text

    return (
        <View style={{ marginVertical: 8 }}>
            <TextComponent typeText='graySmall'>{title}</TextComponent>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <TextComponent style={{ flex: 1, fontSize: 15 }}>{TextCut}</TextComponent>
                <TouchableOpacity
                    onPressIn={CopyText}
                    style={{ width: 22, height: 22 }}>
                    <Image
                        source={require('@/assets/icons/copy.png')}
                        style={{ width: '100%', height: '100%' }}
                        contentFit='contain'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}



