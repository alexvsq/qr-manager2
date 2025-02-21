import { View, Text, ScrollView } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { COLORS, PADDING_HORIZONTAL } from '@/utils/constants'
import CreateComponent from '@/components/creteQr/CreateComponent'
import { useTranslation } from 'react-i18next'
import IconImage from '@/components/IconImage'

export default function type() {

    const { t } = useTranslation()
    const { type } = useLocalSearchParams()

    return (
        <>
            <Stack.Screen
                options={{
                    contentStyle: {
                        backgroundColor: COLORS.whiteBg
                    },
                    headerTitleAlign: 'center',
                    title: t('tab.Create') + ' ' + type as string,
                    headerRight: () => <IconImage item={type as string} />,
                }}
            />

            <ScrollView contentContainerStyle={{ paddingHorizontal: PADDING_HORIZONTAL }}>

                <CreateComponent type={type as string} />
            </ScrollView>
        </>
    )
}