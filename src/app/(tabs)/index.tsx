import { Text, View, StyleSheet } from "react-native";
import Background from "@/components/ui/Background-Page";
import CamerUser from '@/components/CameraUser'
import { COLORS } from '@/utils/constants'

export default function Index() {

  return (
    <Background>

      <View style={styles.CamerContainer}>

        <CamerUser />

      </View>

    </Background >
  );
}

const styles = StyleSheet.create({
  CamerContainer: {
    width: '100%',
    aspectRatio: 1,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.lines,
    borderRadius: 40
  },
})