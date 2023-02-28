import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    plugins: [require('daisyui')],
    theme: {
        extend: {
            fontSize: {
                'xss': '0.5rem',
            }
        }
    }
})
