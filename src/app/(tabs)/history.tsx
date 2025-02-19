import { FlatList } from 'react-native'
import Background from '@/components/ui/Background-Page'
import { useScannedHistory } from '@/hooks/useScannedHistory'
import CardHistory from '@/components/cards/CardHistory'
import TextComponent from '@/components/ui/TextComponent'

export default function history() {

  const { ScannedListHistory } = useScannedHistory()

  return (
    <Background>
      {
        !ScannedListHistory
          ? <TextComponent>No history</TextComponent>
          : <FlatList
            data={ScannedListHistory}
            keyExtractor={(item) => item.id + ""}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}

            ListHeaderComponent={() => <TextComponent typeText='graySmall' >{DateString(ScannedListHistory[0].timeStamp)}</TextComponent>}

            renderItem={({ item }) => (
              < CardHistory item={item} />
            )}

            ItemSeparatorComponent={({ leadingItem }) => {
              if (!leadingItem) return null
              const currentIndex = ScannedListHistory.findIndex((item) => item.id === leadingItem.id)

              if (currentIndex > 0) {

                const before = DateString(ScannedListHistory[currentIndex].timeStamp)
                const current = DateString(ScannedListHistory[currentIndex + 1].timeStamp)

                if (before != current) {
                  return <TextComponent typeText='graySmall' >{current}</TextComponent>
                }
              }
              return null
            }}
          />
      }
    </Background>
  )
}

const DateString = (timeStamp: number) => {
  if (!timeStamp) return ''
  const date = new Date(timeStamp)
  return date.toLocaleDateString()
}