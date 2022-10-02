import { Options } from '$fresh/plugins/twind.ts';

export default {
  selfURL: import.meta.url,
  theme: {
    screens: {
      xxs: '430px',
      xs: '575px',
      sm: '640px',
      md: '768px',
      slg: '920px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      display: ['Onest', '평창체', 'sans-serif'],
      sans: ['"Pretendard Variable"', 'sans-serif'],
    },
  },
  preflight: {
    '@font-face': [
      {
        fontFamily: 'Onest',
        fontWeight: '600',
        src: 'url("/Onest-Medium.woff") format("woff")',
      },
      {
        fontFamily: 'Onest',
        fontWeight: '700',
        src: 'url("/Onest-Bold.woff") format("woff")',
      },
      {
        fontFamily: '평창체',
        fontWeight: '600',
        src: 'url("/PyeongChang-Bold.otf") format("opentype")',
      },
      {
        fontFamily: 'Pretendard Variable',
        fontWeight: '45 920',
        src: 'url("/PretendardVariable.woff2") format("woff2-variations")',
      },
    ],
  },
} as Options;
