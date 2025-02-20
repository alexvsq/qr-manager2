import { View, Text, TextInput, FlatList } from 'react-native'
import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useScannedHistory } from '@/hooks/useScannedHistory'
import { COLORS } from '@/utils/constants'
import CardHistory from '@/components/cards/CardHistory'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function list() {

    const { t } = useTranslation()
    const { list } = useLocalSearchParams()
    const { ScannedListHistory } = useScannedHistory()

    const [InputUserText, setInputUserText] = useState('')

    const FilteredData = ScannedListHistory?.filter((item) =>
        item.value.toLocaleLowerCase().includes(InputUserText.toLocaleLowerCase())
        || new Date(item.timeStamp).toLocaleDateString().toLocaleLowerCase().includes(InputUserText.toLocaleLowerCase())
        || item.type.toLocaleLowerCase().includes(InputUserText.toLocaleLowerCase())
        || item.notes.toLocaleLowerCase().includes(InputUserText.toLocaleLowerCase())
    )

    return (
        <View>
            <Stack.Screen
                options={{
                    title: t('tab.History'),
                    contentStyle: {
                        backgroundColor: COLORS.whiteBg
                    },
                    headerTitleAlign: 'center',
                }}
            />
            <TextInput
                style={{ paddingHorizontal: 10, marginHorizontal: 12, marginVertical: 10, borderRadius: 10, backgroundColor: COLORS.bgSecondary, borderWidth: 1, borderColor: COLORS.lines, minHeight: 40 }}
                onChangeText={setInputUserText}
                value={InputUserText}
                placeholder={t("placeholder.search")}
                autoFocus={true}
            />

            <FlatList
                keyExtractor={(item) => item.id + ""}
                style={{ paddingHorizontal: 12 }}
                data={FilteredData}
                renderItem={({ item }) => (
                    <CardHistory item={item} />
                )}
            />

        </View>
    )
}