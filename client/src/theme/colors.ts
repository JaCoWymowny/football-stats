const appColors = {
    white: '#FFFFFF',
    black: '#111111',
    error: '#FF4E4E',
    alert: '#FDB62F',
    success: '#2FFD8E',
    link: '#2522BA',
    transparent: 'transparent',
};

type ColorsType = Record<keyof typeof appColors, string>;

export const colors: ColorsType = appColors;