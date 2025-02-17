import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { COLORS } from '@/utils/constants'
import { IndexBtns } from '@/components/BtnsHeader'

export default function TabLayout() {
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
                    title: 'Scanner',
                    headerRight: () => <IndexBtns />,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}
