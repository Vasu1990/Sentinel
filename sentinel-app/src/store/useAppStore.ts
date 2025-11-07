import {create} from 'zustand';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface AppState {
  isLoading: boolean;
  snackbar: SnackbarState;
  setIsLoading: (isLoading: boolean) => void;
  showSnackbar: (message: string, severity: SnackbarState['severity']) => void;
  hideSnackbar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  showSnackbar: (message, severity) =>
    set({
      snackbar: {
        open: true,
        message,
        severity,
      },
    }),
  hideSnackbar: () =>
    set((state) => ({
      snackbar: {
        ...state.snackbar,
        open: false,
      },
    })),
}));
