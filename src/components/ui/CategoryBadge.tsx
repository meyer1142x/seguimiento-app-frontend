import { Text, View } from 'react-native';
import type { IncidentCategory } from '@/types';
import { getDynamicStyles, styles } from '@/styles/components/ui/CategoryBadge.styles';

export function CategoryBadge({ category }: { category: IncidentCategory }) {
  const dynamicStyles = getDynamicStyles(category);

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.text, dynamicStyles.text]}>{category}</Text>
    </View>
  );
}
