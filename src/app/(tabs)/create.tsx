import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import TextComponent from '@/components/ui/TextComponent'
import { COLORS, PADDING_HORIZONTAL, SHADOW_DEFAULT } from '@/utils/constants'
import { SCANNED_TYPES } from '@/utils/types'
import IconImage from '@/components/IconImage'
import ListDynamic from '@/components/ListDynamic'
import { router } from 'expo-router'
import { useCreatedHistory } from '@/hooks/useCreatedHistory'
import Animated, { FadeInDown } from 'react-native-reanimated'
import CardRecent from '@/components/cards/CardRecent'
import DivisorLine from '@/components/ui/DivisorLine'
import HeaderCardCreate from '@/components/HeaderCreates'
import EmptyData from '@/components/EmptyData'
import { FlashList } from '@shopify/flash-list'

export default function Create() {

    const { t } = useTranslation()
    const { CreatedListHistory } = useCreatedHistory()

    const dataWithOutBarcode = SCANNED_TYPES.filter((item) => item.codeId !== 'bar' && item.codeId !== 'url')

    const handlePressToCreate = (type: string) => {
        router.push({
            pathname: '/createQr/[type]',
            params: { type: type }
        })
    }
    const handlePressToDetails = (id: number) => {
        router.push({
            pathname: '/detailsScanned/[typehistory]/[id]',
            params: { typehistory: 'created', id: id }
        })
    }

    return (
        <>
            <View style={{ paddingHorizontal: PADDING_HORIZONTAL }}>

                <TextComponent >{t('create.select')}</TextComponent>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 10 }}>
                    {
                        dataWithOutBarcode.map((item, index) => (
                            <TouchableOpacity
                                key={item.codeId}
                                style={styles.containerCard}
                                onPress={() => handlePressToCreate(item.codeId)}
                            >
                                <IconImage item={item.codeId} />
                                <TextComponent >{item.codeId}</TextComponent>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
            <ListDynamic>
                <View style={{ paddingHorizontal: 25 }}>
                    <HeaderCardCreate />
                </View>
                <FlashList
                    estimatedItemSize={69}
                    data={CreatedListHistory?.slice(0, 10)}
                    ListEmptyComponent={() => <EmptyData />}
                    keyExtractor={(item) => item.id + ""}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}

                    renderItem={({ item, index }) => (
                        <Animated.View key={item.id} entering={FadeInDown.delay(index * 50)}>
                            <CardRecent item={item} handlePress={() => handlePressToDetails(item.id)} />
                        </Animated.View>
                    )}
                    ItemSeparatorComponent={() => <DivisorLine />}
                />
            </ListDynamic>

        </>
    )
}

const styles = StyleSheet.create({
    containerCard: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 20,
        minWidth: '40%',
        maxWidth: '50%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        ...SHADOW_DEFAULT
    }
})