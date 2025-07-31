import { View, Pressable, Text } from 'react-native'
import { useScannedHistory } from '@/hooks/useScannedHistory'
import CardHistory from '@/components/cards/CardDetails'
import TextComponent from '@/components/ui/TextComponent'
import { SCANNED_TYPES } from '@/utils/types'
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import { useState } from 'react'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { router } from 'expo-router'
import EmptyData from '@/components/EmptyData'
import { FlashList } from "@shopify/flash-list";

export default function history() {

  const { ScannedListHistory } = useScannedHistory()

  const [currentType, setCurrentType] = useState('all')

  const handleChangeType = (type: string) => {
    setCurrentType(type)
  }

  const filteredScannedListHistory = () => {
    if (currentType == 'all') return ScannedListHistory

    return ScannedListHistory?.filter((item) => item.type == currentType)
  }

  const handlePress = (id: number) => {
    router.push({
      pathname: '/detailsScanned/[typehistory]/[id]',
      params: { typehistory: 'scanned', id: id }
    })
  }


  const all = {
    codeId: 'all',
    iconImg: require('@/assets/icons/text.svg'),
    color: COLORS.blackBg
  }

  return (
    <View style={{ flex: 1 }}>
      {
        !ScannedListHistory
          ? <EmptyData />
          :
          <>

            <FlashList
              data={currentType != 'all' ? [all, ...SCANNED_TYPES] : SCANNED_TYPES}
              horizontal={true}
              estimatedItemSize={45}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.codeId}
              contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 5 }}
              ListHeaderComponent={() => {

                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable style={{ paddingHorizontal: 10, paddingVertical: 4, backgroundColor: COLORS.blackBg, borderRadius: 8, marginHorizontal: 5 }}>
                      <Text style={{ color: COLORS.whiteBg, fontWeight: 400, fontSize: 12 }}>{currentType}</Text>
                    </Pressable>
                    <TextComponent > | </TextComponent>
                  </View>
                )
              }}
              renderItem={({ item }) => {
                if (currentType == item.codeId) return null

                return (
                  <Pressable
                    onPress={() => handleChangeType(item.codeId)}
                    style={{ paddingHorizontal: 8, paddingVertical: 2, backgroundColor: item.color + '20', borderRadius: 8, marginHorizontal: 3 }}
                  >
                    <Text style={{ color: item.color, fontWeight: 500, fontSize: 12 }}>{item.codeId}</Text>
                  </Pressable>
                )
              }}
            />
            <FlashList
              data={filteredScannedListHistory()}
              keyExtractor={(item) => item.id + ""}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}
              estimatedItemSize={69}
              ListHeaderComponent={() => <TextComponent typeText='graySmall' style={{ margin: 8 }}>{DateString(ScannedListHistory[0].timeStamp)}</TextComponent>}

              renderItem={({ item, index }) => (
                <Animated.View entering={FadeInLeft.delay(index * 30)}>
                  < CardHistory handlePress={() => handlePress(item.id)} item={item} />
                </Animated.View>
              )}

              ItemSeparatorComponent={({ leadingItem }) => {
                if (!leadingItem) return null
                const currentIndex = ScannedListHistory.findIndex((item) => item.id === leadingItem.id)

                if (currentIndex >= 0) {

                  const before = DateString(ScannedListHistory[currentIndex].timeStamp)
                  const current = DateString(ScannedListHistory[currentIndex + 1].timeStamp)

                  if (current && before != current) {
                    return <TextComponent typeText='graySmall' style={{ margin: 8 }}>{current}</TextComponent>
                  }
                }
                return null
              }}
            />
          </>
      }
    </View>
  )
}

const DateString = (timeStamp: number) => {
  if (!timeStamp) return ''
  const date = new Date(timeStamp)
  return date.toLocaleDateString()
}