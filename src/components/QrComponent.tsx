import { View, Dimensions, StyleSheet } from 'react-native'
import { ScannedHistoryData } from '@/types/types'
import TextComponent from '@/components/ui/TextComponent'
import { BtnCircle } from '@/components/BtnsHeader'
import Animated, { FlipInEasyX } from 'react-native-reanimated'
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import { useState, useRef } from 'react'
import PickColorModal from '@/components/modals/PickColorModal'
import QRCode from 'react-native-qrcode-svg';
import { saveBase64Image, shareBase64Image, pickImage } from '@/functions/saveQr'

interface Props {
    data: ScannedHistoryData
    DeleteFunction: () => void
}

const WIDTH_SCREEN = Dimensions.get('screen').width

export default function QrComponent({ data, DeleteFunction }: Props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [LogoImage, setLogoImage] = useState<string | null>(null);

    const [QrColor, setQrColor] = useState({ hexBg: '#fff', hexLines: '#000000' });

    let qrRef = useRef();

    const saveImage = async () => {
        const gaa = qrRef.current
        if (!gaa) return

        (gaa as any).toDataURL((x: any) => {
            saveBase64Image(x)
        })

    }

    const shareImage = async () => {
        const gaa = qrRef.current
        if (!gaa) return

        (gaa as any).toDataURL((x: any) => {
            shareBase64Image(x)
        })
    };

    const pickImageToLogo = async () => {
        const image = await pickImage()
        if (!image) return

        setLogoImage(image)
    }

    return (
        <View>
            <Animated.View entering={FlipInEasyX} style={styles.qrContainer}>
                <View style={styles.qr}>
                    <QRCode
                        size={260}
                        logoMargin={0}
                        logo={LogoImage ? { uri: LogoImage } : undefined}
                        quietZone={15}
                        value={data.value}
                        color={QrColor.hexLines}
                        backgroundColor={QrColor.hexBg}
                        getRef={(c) => qrRef.current = c}

                    />
                </View>
            </Animated.View>

            <View style={styles.containerDates}>
                <TextComponent typeText='graySmall'>{new Date(data.timeStamp).toLocaleTimeString()}</TextComponent>
                <TextComponent typeText='graySmall'>{data.barcodeType}</TextComponent>
                <TextComponent typeText='graySmall'>{new Date(data.timeStamp).toLocaleDateString()}</TextComponent>
            </View>

            <View style={{ flexDirection: 'row', gap: 25, justifyContent: 'center', marginBottom: 15 }}>
                <BtnCircle image={require('@/assets/icons/trash.png')} FuncPress={DeleteFunction} />
                <BtnCircle image={require('@/assets/icons/image.png')} FuncPress={pickImageToLogo} />
                <BtnCircle image={require('@/assets/icons/color.png')} FuncPress={() => { setModalVisible(true) }} />
                <BtnCircle image={require('@/assets/icons/download.png')} FuncPress={saveImage} />
                <BtnCircle image={require('@/assets/icons/share.png')} FuncPress={shareImage} />
            </View>
            <PickColorModal
                showModal={modalVisible}
                setShowModal={setModalVisible}
                defaultColor={QrColor}
                setQrColor={setQrColor}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    qrContainer: {
        width: WIDTH_SCREEN,
        maxHeight: 500,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qr: {
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        ...SHADOW_DEFAULT
    },
    containerDates: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
        marginVertical: 10
    }
})