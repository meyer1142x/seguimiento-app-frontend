import { Text, View, useColorScheme } from 'react-native';
import { getDynamicStyles, styles } from '@/styles/components/ui/Header.styles';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const isDark = useColorScheme() === 'dark';
  const dynamicStyles = getDynamicStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, dynamicStyles.title]}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}