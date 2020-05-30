import { useEffect } from 'react';

/**
 * 領域外クリックイベントをリッスンするカスタムフック
 * @param callback 領域外クリックイベントが行われた際に発火するコールバック
 * @param enabled 領域外クリックイベントのリッスンが有効化されているかどうかのフラグ
 */
export const useOutsideClick = (callback: (e: MouseEvent) => void, enabled = true) => {
  useEffect(() => {
    const args = ['click', callback, true] as const;
    if (enabled) {
      window.removeEventListener('click', callback);
      window.requestAnimationFrame(() => window.addEventListener(...args));
    }

    return () => window.removeEventListener(...args);
  }, [callback, enabled]);
};
