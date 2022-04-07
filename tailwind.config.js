module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sourceSans: ["Source Sans Pro", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        silver: "#E4E7F0",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
