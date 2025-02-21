import { View, TextInput, Modal, Pressable, StyleSheet, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import TextComponent from '@/components/ui/TextComponent'
import { COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import { UpdateNotesOfScannedHistory, UpdateNotesOfCreatedHistory } from '@/functions/sql/setData'
import { useTranslation } from 'react-i18next'

const WIDTH_SCREEN = Dimensions.get('window').width
const HEIGHT_SCREEN = Dimensions.get('window').height

interface Props {
    id: number;
    TextSaved: string;
    typeHistory: string
}

export const InputNotes = ({ id, TextSaved, typeHistory }: Props) => {

    const { t } = useTranslation()
    const [notesInput, setNotesInput] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const updateNotes = async () => {
        if (typeHistory == 'scanned') {
            await UpdateNotesOfScannedHistory(id, notesInput)
        }
        if (typeHistory == 'created') {
            await UpdateNotesOfCreatedHistory(id, notesInput)
        }
    }

    useEffect(() => {
        if (notesInput.length == 0) return

        const timer = setTimeout(() => {
            updateNotes()
        }, 1000)

        return () => clearTimeout(timer)
    }, [notesInput])

    const TextToShowOnButton = notesInput.length > 0 ? notesInput :
        TextSaved == '' ? t('notes.placeholder') : TextSaved

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <TextComponent typeText='titleCard' style={{ textAlign: 'center' }}>{t('notes.title')}</TextComponent>

                        <TextInput
                            placeholder={TextSaved == '' ? t('notes.placeholder') : TextSaved}
                            style={{ flex: 1, backgroundColor: COLORS.bgSecondary, padding: 5, borderRadius: 10 }}
                            multiline={true}
                            onChangeText={setNotesInput}
                            value={notesInput}
                            autoFocus={true}
                        />
                        <Pressable
                            style={styles.buttonModal}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <TextComponent style={{ textAlign: 'center' }} typeText='textButton'>{t('button.close')}</TextComponent>
                        </Pressable>

                    </View>
                </View>
            </Modal>

            <View style={{ marginVertical: 10 }} >

                <TextComponent typeText='graySmall' >{t('notes.title')}</TextComponent>

                <Pressable
                    onPressIn={() => setModalVisible(true)}
                    style={{ backgroundColor: COLORS.bgSecondary, padding: 5, borderRadius: 10, borderWidth: 1, borderColor: COLORS.lines }}>
                    <TextComponent style={{ padding: 2 }} >{TextToShowOnButton}</TextComponent>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000060',
    },
    modalView: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 10,
        gap: 20,
        width: WIDTH_SCREEN * 0.8,
        height: HEIGHT_SCREEN * 0.3,
        maxHeight: 400,
        maxWidth: 500,
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
