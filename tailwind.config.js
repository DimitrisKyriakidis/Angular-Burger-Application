module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        //main theme colors
        primary: 'var(--mainColor)',
        secondary: 'var(--secondColor)',
        carouselText: 'var(--carouselText)',
        coverPhoto: 'var(--coverPhoto)',

        customGray: {
          100: '#808080',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
