import { useEffect } from 'react';
import { useSnackbar, VariantType } from 'notistack';

const baseOptions = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  preventDuplicate: true,
  autoHideDuration: 5000,
} as const;

/**
 * メッセージ(複数可)をSnackbarに出力するカスタムフック
 * @param messages メッセージの配列
 * @param {VariantType} variant メッセージの種類
 */
export const useSnackbarMessages = (messages: string[], variant: VariantType = 'default') => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    messages.forEach((m) => enqueueSnackbar(m, { ...baseOptions, variant }));
  }, [messages, enqueueSnackbar, variant]);
};
