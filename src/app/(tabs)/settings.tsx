import { View, ScrollView, StyleSheet, Switch, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import TextComponent from '@/components/ui/TextComponent'
import { PADDING_HORIZONTAL, COLORS, SHADOW_DEFAULT } from '@/utils/constants'
import DivisorLine from '@/components/ui/DivisorLine'
import { useSettings } from '@/hooks/useSettings'
import { LANGUAGES } from '@/utils/constants'
import { useState, useEffect } from 'react'

export default function settings() {

    const { t } = useTranslation()
    const { toggleLanguage, DeleteAll, configState, saveNewConfig, setDefaultConfig } = useSettings()

    const [InputSeconds, setInputSeconds] = useState(configState.SecondDelay.toString())

    const comfirmDeleteAll = async () => {
        Alert.alert(
            t('config.deleteAll'),
            t('config.deleteAllConfirm'),
            [
                {
                    text: t('button.cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: t('button.delete'), onPress: () => DeleteAll() }
            ],
            { cancelable: false }
        )
    }



    useEffect(() => {
        if (InputSeconds.length >= 2 || InputSeconds == '0' || InputSeconds == '') return
        const timeOut = setTimeout(() => {
            saveNewConfig('SecondDelay', Number(InputSeconds))
        }, 1000);
        return () => clearTimeout(timeOut);
    }, [InputSeconds])

    return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: PADDING_HORIZONTAL }}>

            <TextComponent typeText='titleCard'>{t('config.title.scanner')}</TextComponent>

            <View style={styles.containerCard}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextComponent >{t('config.vibration')}</TextComponent>
                    <Switch
                        style={styles.switchStyle}
                        trackColor={{ false: COLORS.lines, true: COLORS.lines }}
                        thumbColor={configState.vibration ? COLORS.blue : COLORS.white}
                        onValueChange={(value) => saveNewConfig('vibration', value)}
                        value={configState.vibration}
                    />
                </View>
                <DivisorLine />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextComponent >{t('config.sound')}</TextComponent>
                    <Switch
                        style={styles.switchStyle}
                        trackColor={{ false: COLORS.lines, true: COLORS.lines }}
                        thumbColor={configState.sound ? COLORS.blue : COLORS.white}
                        onValueChange={(value) => saveNewConfig('sound', value)}
                        value={configState.sound}
                    />
                </View>
                <DivisorLine />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextComponent >{t('config.popUp')}</TextComponent>
                    <Switch
                        style={styles.switchStyle}
                        trackColor={{ false: COLORS.lines, true: COLORS.lines }}
                        thumbColor={configState.showPopUp ? COLORS.blue : COLORS.white}
                        onValueChange={(value) => saveNewConfig('showPopUp', value)}
                        value={configState.showPopUp}
                    />
                </View>
                <DivisorLine />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextComponent >{t('config.delay')} <TextComponent typeText='graySmall'>(s)</TextComponent></TextComponent>
                    <TextInput
                        style={styles.inputDelay}
                        maxLength={1}
                        keyboardType='numeric'
                        placeholder={configState.SecondDelay.toString()}
                        onChangeText={(text) => setInputSeconds(text)}
                        value={InputSeconds}
                        onFocus={() => setInputSeconds('')}
                    />
                </View>

            </View>

            <TextComponent typeText='titleCard'>{t('config.languages')}</TextComponent>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 15 }}>
                {
                    LANGUAGES.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => toggleLanguage(item.code)}
                            key={item.code}
                            style={[styles.buttonLang, configState.language == item.code ? { backgroundColor: COLORS.blackBg } : { backgroundColor: COLORS.whiteBg }]}>
                            <TextComponent typeText={configState.language == item.code ? 'white' : 'default'} >{item.name}</TextComponent>
                        </TouchableOpacity>
                    ))
                }
            </View>


            <TextComponent typeText='titleCard'>{t('config.otherconfigs')}</TextComponent>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 10, justifyContent: 'center', }}>

                <TouchableOpacity
                    onPress={setDefaultConfig}
                    style={styles.button2}>
                    <TextComponent typeText='white'>{t('config.reset')}</TextComponent>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={comfirmDeleteAll}
                    style={styles.buttonDelete}>
                    <TextComponent typeText='white'>{t('config.deleteAll')}</TextComponent>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerCard: {
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        ...SHADOW_DEFAULT
    },
    buttonLang: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        ...SHADOW_DEFAULT
    },
    button2: {
        backgroundColor: COLORS.blue,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        ...SHADOW_DEFAULT
    },
    buttonDelete: {
        backgroundColor: '#d60404ff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        ...SHADOW_DEFAULT
    },
    inputDelay: {
        backgroundColor: COLORS.bgSecondary, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10, marginTop: 10, minWidth: 50, textAlign: 'center'
    },
    switchStyle: {
        minHeight: 45
    }
})