import { View, TextInput } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useScannedHistory } from '@/hooks/useScannedHistory';
import { useCreatedHistory } from '@/hooks/useCreatedHistory';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@/utils/constants';
import CardHistory from '@/components/cards/CardDetails';
import EmptyData from '@/components/EmptyData';
import { FlashList } from '@shopify/flash-list'

export default function List() {
    const { t } = useTranslation();
    const { typehistory } = useLocalSearchParams();
    const { ScannedListHistory } = useScannedHistory();
    const { CreatedListHistory } = useCreatedHistory();
    const [inputUserText, setInputUserText] = useState('');

    const handlePress = (id: number) => {
        const type = typehistory === 'scanned' ? 'scanned' : 'created';
        router.push({
            pathname: '/detailsScanned/[typehistory]/[id]',
            params: { typehistory: type, id }
        });
    };

    const searchInField = (field: string, searchText: string): boolean => {
        return field.toLowerCase().includes(searchText.toLowerCase());
    };

    const filteredData = (typehistory === 'scanned' ? ScannedListHistory : CreatedListHistory)
        ?.filter((item) => {
            const searchText = inputUserText.toLowerCase();
            return (
                searchInField(item.value, searchText) ||
                searchInField(new Date(item.timeStamp).toLocaleDateString(), searchText) ||
                searchInField(item.type, searchText) ||
                searchInField(item.notes, searchText)
            );
        });

    return (
        <View style={{ flex: 1 }}>
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
                style={{
                    paddingHorizontal: 10,
                    marginHorizontal: 12,
                    marginVertical: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.bgSecondary,
                    borderWidth: 1,
                    borderColor: COLORS.lines,
                    minHeight: 40
                }}
                onChangeText={setInputUserText}
                value={inputUserText}
                placeholder={t("placeholder.search")}
                autoFocus
            />

            <FlashList
                estimatedItemSize={69}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                ListEmptyComponent={() => <EmptyData />}
                data={filteredData}
                renderItem={({ item }) => (
                    <CardHistory
                        handlePress={() => handlePress(item.id)}
                        item={item}
                    />
                )}
            />
        </View>
    );
}