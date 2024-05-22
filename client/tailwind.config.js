/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx}', './index.html'];
export const theme = {
    extend: {
        colors: {
            primary: '#195B00', // Set the default primary color
            secondary: '#0F3E00', // Set the default secondary color
            tertiary: '#86A789', // Set the default tertiary color
            quaternary: '#bec3bf', // Set the default quaternary color
        },
        fontSize: {
            headingText: 'clamp(2rem, 1.2500rem + 3.3333vw, 3rem);',
            subHeadingText: 'clamp(1.25rem, 0.6875rem + 2.5000vw, 2rem);',
            subText: 'clamp(1rem, 0.6250rem + 1.6667vw, 1.5rem);',
            mediumText: 'clamp(0.875rem, 0.75rem + 0.6667vw, 1.25rem);',
            bodyText: 'clamp(0.75rem, 0.6429rem + 0.4762vw, 1rem);',
            tableText: 'clamp(0.625rem, 0.635vw + 0.446rem, 0.875rem)',
        },
        boxShadow: {
            '3xl': '0px 2px 15px rgba(0, 0, 0, 0.2);',
            '4xl': '0px 2px 15px rgba(0, 0, 0, 0.5);',
        },
        screens: {
            xs: '450px',
            mlg: '900px',
        },
        maxWidth: {
            'website-max-screen': '2560px',
        },
        translate: {
            '3/5': '60%',
        },
        borderRadius: {
            '4xl': '2rem',
        },
        scale: {
            102: '1.02',
        },
        spacing: {
            full: '100%',
            '1/2': '50%',
            '1/3': '33.333333%',
            '2/3': '66.666667%',
            '1/4': '25%',
            '3/4': '75%',
            '1/5': '20%',
            '2/5': '40%',
            '3/5': '60%',
            '4/5': '80%',
            '1/6': '16.666667%',
            '5/6': '83.333333%',
            '1/8': '12.5%',
            '3/8': '37.5%',
            '5/8': '62.5%',
            '7/8': '87.5%',
            '1/10': '10%',
            '3/10': '30%',
            '7/10': '70%',
            '9/10': '90%',
            '1/12': '8.333333%',
            '5/12': '41.666667%',
            '7/12': '58.333333%',
            '11/12': '91.666667%',
        },
    },
};
  