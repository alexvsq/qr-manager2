import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import CamerUser from '@/components/CameraUser'
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import ListDynamic from "@/components/ListDynamic";
import HeaderCardIndex from "@/components/HeaderCardIndex";
import CardRecentIndex from "@/components/cards/CardRecent";
import DivisorLine from "@/components/ui/DivisorLine";
import { useScannedHistory } from '@/hooks/useScannedHistory'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { router } from 'expo-router'

const WIDTH_SCREEN = Dimensions.get('window').width

export default function Index() {

  const { ScannedListHistory } = useScannedHistory()

  const handlePress = (id: number) => {
    router.push({
      pathname: '/detailsScanned/[typehistory]/[id]',
      params: { typehistory: 'scanned', id: id }
    })
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.CameraContainer} >
        <View style={[styles.Camera, { flex: 1 }]}>

          <View style={styles.borderTL} />
          <View style={styles.borderTR} />
          <View style={styles.borderBL} />
          <View style={styles.borderBR} />

          <CamerUser />
        </View>
      </View>

      <ListDynamic>
        <View style={{ paddingHorizontal: 25 }}>

          <HeaderCardIndex />

          {/*           <FlatList
            data={ScannedListHistory?.slice(0, 8)}
            keyExtractor={(item) => item.id + ""}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
              <CardRecentIndex  {...item} />
            )}
            ItemSeparatorComponent={() => <DivisorLine />}
          /> */}
          {
            ScannedListHistory?.slice(0, 5).map((item, index) => (
              <Animated.View key={item.id} entering={FadeInDown.duration(index * 50)}>
                <CardRecentIndex item={item} handlePress={() => handlePress(item.id)} />
              </Animated.View>
            ))
          }


        </View>
      </ListDynamic>

    </View>
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
    borderRadius: 40,
    position: 'relative'
  },
  InfoBottom: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    ...SHADOW_DEFAULT
  },
  borderTL: { position: 'absolute', top: -2, left: -2, width: 60, height: 60, borderTopStartRadius: 40, borderTopColor: COLORS.blackBg, borderTopWidth: 4, borderLeftWidth: 4 },
  borderTR: { position: 'absolute', top: -2, right: -2, width: 60, height: 60, borderTopEndRadius: 40, borderTopColor: COLORS.blackBg, borderTopWidth: 4, borderRightWidth: 4 },
  borderBL: { position: 'absolute', bottom: -2, left: -2, width: 60, height: 60, borderBottomStartRadius: 40, borderTopColor: COLORS.blackBg, borderBottomWidth: 4, borderLeftWidth: 4 },
  borderBR: { position: 'absolute', bottom: -2, right: -2, width: 60, height: 60, borderBottomEndRadius: 40, borderTopColor: COLORS.blackBg, borderBottomWidth: 4, borderRightWidth: 4 }

})