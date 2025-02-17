import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import Background from "@/components/ui/Background-Page";
import CamerUser from '@/components/CameraUser'
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import ListDynamic from "@/components/ListDynamic";
import HeaderCardIndex from "@/components/HeaderCardIndex";
import CardRecentIndex from "@/components/cards/CardRecentIndex";
import DivisorLine from "@/components/DivisorLine";
import { useScannedHistory } from '@/hooks/useScannedHistory'

const WIDTH_SCREEN = Dimensions.get('window').width

export default function Index() {

  const { ScannedListHistory } = useScannedHistory()

  return (
    <Background>
      <View style={{ flex: 1 }}>

        <View style={styles.CameraContainer} >
          <View style={[styles.Camera, { flex: 1 }]}>
            <CamerUser />
          </View>
        </View>

        <ListDynamic>
          <View style={{ paddingHorizontal: 30 }}>
            <HeaderCardIndex />
            <FlatList
              data={ScannedListHistory}
              keyExtractor={(item) => item.id + ""}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 20 }}
              renderItem={({ item }) => (
                <CardRecentIndex  {...item} />
              )}
              ItemSeparatorComponent={() => <DivisorLine />}
            />
          </View>
        </ListDynamic>


      </View>
    </Background >
  );
}

const styles = StyleSheet.create({
  CameraContainer: {
    height: WIDTH_SCREEN,
    width: WIDTH_SCREEN,
    padding: 12,
    maxHeight: 500,
    maxWidth: 500,
  },

  Camera: {
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.lines,
    borderRadius: 40
  },
  InfoBottom: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    ...SHADOW_DEFAULT
  }
})