import { Image, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@/constants/theme';

export default function UserAvatar({ uri, size, iconSize, iconColor, style }: any) {
  const dimensions = size ? { width: size, height: size, borderRadius: size / 2 } : {};
  return (
    <View style={[styles.container, dimensions, style]}>
      {uri
        ? <Image source={{ uri }} style={styles.image} resizeMode="cover" />
        : <Ionicons name="person" size={iconSize ?? RFValue(22)} color={iconColor ?? Colors.primary} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
