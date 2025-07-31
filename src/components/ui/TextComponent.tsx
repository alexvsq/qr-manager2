import { Text, StyleSheet, type TextProps } from 'react-native'
import { COLORS } from '@/utils/constants'

type TextComponentProps = TextProps & {
	typeText?: 'default' | 'titleCard' | 'gray' | 'graySmall' | 'textButton' | 'white'
}

export default function TextComponent({ typeText = 'default', style, ...res }: TextComponentProps) {
	return (
		<Text
			style={[style,
				typeText === 'default' && styles.default,
				typeText === 'titleCard' && styles.titleCard,
				typeText === 'gray' && styles.Gray,
				typeText === 'graySmall' && styles.GraySmall,
				typeText === 'textButton' && styles.textButton,
				typeText === 'white' && styles.white,
			]}
			{...res}
		/>
	)
}

const styles = StyleSheet.create({
	default: {
		fontFamily: 'Poppins-Regular',
		color: COLORS.text1,
	},
	white: {
		fontFamily: 'Poppins-Regular',
		color: COLORS.white,
	},
	titleCard: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: 14,
		color: COLORS.text1,

	},
	GraySmall: {
		fontFamily: 'Poppins-Regular',
		fontSize: 11,
		color: COLORS.textGray,
	},
	Gray: {
		fontFamily: 'Poppins-Regular',
		fontSize: 14,
		color: COLORS.textGray,
	},
	textButton: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: 15,
		color: COLORS.white,
	}
})