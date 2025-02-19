import { Text, StyleSheet, type TextProps } from 'react-native'
import { COLORS } from '@/utils/constants'

type TextComponentProps = TextProps & {
	typeText?: 'default' | 'titleCard' | 'gray' | 'graySmall'
}

export default function TextComponent({ typeText = 'default', style, ...res }: TextComponentProps) {
	return (
		<Text
			style={[style,
				typeText === 'default' && styles.default,
				typeText === 'titleCard' && styles.titleCard,
				typeText === 'gray' && styles.Gray,
				typeText === 'graySmall' && styles.GraySmall,
			]}
			{...res}
		/>
	)
}

const styles = StyleSheet.create({
	default: {
		fontFamily: 'Poppins-Medium',
		color: COLORS.text1,
	},
	titleCard: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: 15,
		color: COLORS.text1,

	},
	GraySmall: {
		fontFamily: 'Poppins-Regular',
		fontSize: 12,
		color: COLORS.textGray,
	},
	Gray: {
		fontFamily: 'Poppins-Regular',
		fontSize: 14,
		color: COLORS.textGray,
	},
})