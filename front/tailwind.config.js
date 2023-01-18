module.exports = {
  important: true,
  purge: {
      content: [
          './src/**/*.{html,ts}',
      ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
      extend: {
          gridRowStart: {
              '8': '8',
              '9': '9',
              '10': '10',
              '11': '11',
              '12': '12',
              '13': '13',
          },
          borderWidth: {
              DEFAULT: '1px',
              '0': '0',
              '2': '2px',
              '3': '3px',
              '4': '4px',
              '5': '5px',
              '6': '6px',
              '7': '7px',
              '8': '8px',
          },
          left: {
              '25': '400px',
              '26': '416px',
              '27': '432px',
          },
          height: {
              '128': '655px',
          },
      },
  },
  variants: {
      extend: {},
  },
  plugins: [],
}