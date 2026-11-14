import { StyleSheet } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

export interface ReportColors {
  text: string;
  muted: string;
  surface: string;
  border: string;
  chipBg: string;
  accent: string;
  activeText: string;
}

export const getColors = (isDark: boolean) => {
  const palette = isDark ? colors.dark : colors.light;
  return {
    text: palette.text,
    muted: palette.muted,
    surface: palette.surface,
    border: palette.border,
    chipBg: isDark ? palette.background : palette.backgroundSubtle,
    accent: palette.accent,
    activeText: palette.textOnAccent,
  };
};

export const getOptionStyles = (
  active: boolean,
  tone: string,
  optionColor: string | undefined,
  palette: ReportColors,
) => ({
  chip: {
    backgroundColor: active ? tone : palette.chipBg,
    borderColor: active ? tone : optionColor ? `${optionColor}66` : palette.border,
  },
  dot: { backgroundColor: optionColor ?? palette.accent },
  iconColor: active ? palette.activeText : palette.muted,
  text: { color: active ? palette.activeText : palette.muted },
});

export const getDynamicStyles = (isDark: boolean, insets: EdgeInsets) => ({
  screen: {
    backgroundColor: (isDark ? colors.dark : colors.light).background,
    paddingTop: insets.top + 10,
  },
  card: {
    backgroundColor: (isDark ? colors.dark : colors.light).surface,
    borderColor: (isDark ? colors.dark : colors.light).border,
  },
  footer: {
    backgroundColor: isDark ? colors.dark.background : colors.light.backgroundSubtle,
    borderTopColor: (isDark ? colors.dark : colors.light).border,
  },
  bottomSheet: {
    backgroundColor: (isDark ? colors.dark : colors.light).surface,
  },
  iconBox: {
    backgroundColor: isDark ? colors.dark.background : '#F1F5F9',
  },
  cancelIconBox: {
    backgroundColor: isDark ? '#450A0A' : '#FDECEC',
  },
  optionalLabel: { color: isDark ? colors.dark.muted : colors.light.muted },
  changePhoto: { color: isDark ? colors.dark.accent : colors.light.accent },
});

export const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerWrapper: {
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  spacer: { height: 4 },
  divider: {
    height: 1,
    marginVertical: 16,
    opacity: 0.6,
  },
  optionGroupSpacer: {
    paddingVertical: 2,
  },
  optionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  optionalLabel: {
    fontWeight: '500',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  errorInline: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
  chipWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  evidenceTitle: {
    marginLeft: 4,
    marginBottom: 12,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.dark.accent}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 13,
  },
  evidenceDone: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
  },
  evidenceImagePreview: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#CBD5E1',
  },
  evidenceDoneInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  evidenceDoneText: {
    fontSize: 15,
    fontWeight: '700',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
                      
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 20,
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  sheetIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  sheetOptionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  changePhotoText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  cancelText: {
    color: '#DC2626',
  },
});
