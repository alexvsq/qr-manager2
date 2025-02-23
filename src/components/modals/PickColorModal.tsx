import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '@/utils/constants'
import ColorPicker, { Panel1, Swatches, Preview, HueSlider } from 'reanimated-color-picker';
import TextComponent from '@/components/ui/TextComponent';

interface DefaultColorType {
    hexBg: string
    hexLines: string
}

type Props = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    defaultColor: DefaultColorType,
    setQrColor: (value: DefaultColorType) => void,
}

export default function ModalPickColor({ showModal, setShowModal, defaultColor, setQrColor }: Props) {



    return (
        <Modal
            transparent={showModal}
            visible={showModal}
            animationType='fade'
            onRequestClose={() => setShowModal(false)}
        >
            <View style={styles.containerModal}>

                <View style={styles.modalColor}>
                    <TextComponent typeText='graySmall' >Bg</TextComponent>
                    <ColorPicker
                        value={defaultColor.hexBg}
                        onComplete={(result) => setQrColor({
                            hexBg: result.hex,
                            hexLines: defaultColor.hexLines
                        })}
                    >

                        <Preview />
                        <Panel1 style={{ height: 100 }} />
                        <HueSlider style={{ marginVertical: 15 }} />

                    </ColorPicker>
                    <TextComponent typeText='graySmall' >Lines</TextComponent>

                    <ColorPicker
                        value={defaultColor.hexLines}
                        onComplete={(result) => setQrColor({
                            hexBg: defaultColor.hexBg,
                            hexLines: result.hex
                        })}
                    >

                        <Preview />
                        <Panel1 style={{ height: 100 }} />
                        <HueSlider style={{ marginVertical: 15 }} />

                    </ColorPicker>

                    <TouchableOpacity
                        style={styles.buttonModal}
                        onPress={() => setShowModal(false)}
                    >
                        <TextComponent typeText='white' >OK</TextComponent>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    containerModal: {
        flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center'
    },
    modalColor: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 20,
        width: 300,
        maxWidth: '90%'
    },
    buttonModal: {
        backgroundColor: COLORS.blackBg,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});