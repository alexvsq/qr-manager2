import { View, type ViewProps } from 'react-native';
import { COLORS } from '@/utils/constants';

interface PropsDivisorLine extends ViewProps {

}

export default function DivisorLine({ style }: PropsDivisorLine) {
    return (
        <View style={[{ width: '100%', height: 1, backgroundColor: COLORS.lines }, style]} />
    )
}