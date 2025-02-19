import { View, Text, TouchableOpacity, TextInput, Alert, Modal, Pressable, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { ScannedHistoryData } from '@/types/types'
import { Image } from 'expo-image'
import TextComponent from '@/components/ui/TextComponent'
import { COLORS } from '@/utils/constants'
import { UpdateNotesOfScannedHistory } from '@/functions/sql/setData'
import Web from '@/components/InfoEdit/Kinds/Web'
import Wifi from '@/components/InfoEdit/Kinds/Wifi'
import { useTranslation } from 'react-i18next'

export const InfoTitleAndText = ({ title, text }: { title: string, text: string }) => {
    return (
        <View style={{ marginVertical: 10 }}>
            <TextComponent typeText='graySmall'>{title}</TextComponent>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 }}>
                <TextComponent style={{ flex: 1, fontSize: 16 }}>{text}</TextComponent>
                <TouchableOpacity style={{ width: 22, height: 22 }}>
                    <Image
                        source={require('@/assets/icons/copy.png')}
                        style={{ width: '100%', height: '100%' }}
                        contentFit='contain'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const InputNotes = ({ id }: { id: number }) => {

    const { t } = useTranslation()
    const [notesInput, setNotesInput] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const updateNotes = async () => {
        await UpdateNotesOfScannedHistory(id, notesInput)
    }

    useEffect(() => {
        if (notesInput.length == 0) return

        const timer = setTimeout(() => {
            //updateNotes()
            console.log(notesInput);
        }, 1000)

        return () => clearTimeout(timer)
    }, [notesInput])


    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View
                style={{ marginVertical: 10 }}
            >
                <TextComponent typeText='graySmall' >{t('notes')}</TextComponent>

                <Pressable
                    onPress={() => {
                        setModalVisible(true)
                        console.log('fallaste')
                    }}
                    style={{ backgroundColor: COLORS.bgSecondary, padding: 5, borderRadius: 10, borderWidth: 1, borderColor: COLORS.lines }}>
                    <TextComponent>Escribe tus notas aquí</TextComponent>
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
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
