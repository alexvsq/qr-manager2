import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { COLORS } from '@/utils/constants'
import { IndexBtns } from '@/components/BtnsHeader'
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next'

export default function TabLayout() {

    const { t } = useTranslation()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.white,
                headerTitleAlign: 'left',
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: COLORS.whiteBg,
                },
                headerTitleStyle: {
                    fontFamily: 'Poppins-SemiBold',
                },
                sceneStyle: {
                    backgroundColor: COLORS.blackBg
                },
                tabBarStyle: {
                    backgroundColor: COLORS.blackBg,
                    borderTopWidth: 0
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('tab.Scanner'),
                    headerRight: () => <IndexBtns />,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="line-scan" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: t('tab.History'),
                    tabBarIcon: ({ color }) => <Fontisto name="history" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: t('tab.Create'),
                    tabBarIcon: ({ color }) => <MaterialIcons name="create" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: t('tab.Settings'),
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}
