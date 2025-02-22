import { Modal, StyleSheet, Pressable, View, Dimensions } from 'react-native';
import DecoderInfoToShow from '@/components/InfoEdit/DecodeInfoToShow'
import { ScannedHistoryData } from '@/types/types'
import { useTranslation } from 'react-i18next'
import TextComponent from '../ui/TextComponent';
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import IconImage from '@/components/IconImage'

const WIDTH_SCREEN = Dimensions.get('window').width

interface ScannerInfoProps {
    modalVisible: boolean
    setModalVisible: Function
    info: ScannedHistoryData | null
}

export default function App({ modalVisible, setModalVisible, info }: ScannerInfoProps) {

    const { t } = useTranslation()

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextComponent typeText='titleCard' >{info?.type}</TextComponent>
                        <IconImage item={info?.type} />
                    </View>

                    <DecoderInfoToShow
                        item={info}
                        typeHistory='scanned'
                    />

                    <Pressable
                        style={styles.buttonModal}
                        onPress={() => setModalVisible(false)}>
                        <TextComponent style={{ textAlign: 'center' }} typeText='textButton'>{t('button.close')}</TextComponent>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: WIDTH_SCREEN * 0.8,
        minHeight: 200,
        maxWidth: 500,
        padding: 20,
        ...SHADOW_DEFAULT
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