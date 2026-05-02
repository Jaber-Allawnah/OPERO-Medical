import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ActionButton({title, onPress, style, textStyle, activeOpacity = 0.85}: any) {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            activeOpacity={activeOpacity}
        >
            <Text style={[styles.text, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: '600',
    },
});