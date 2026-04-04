/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['variant', ['@media (prefers-color-scheme: dark) { &:where(.dark, .dark *) }']],
	content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		colors: {
			current: 'currentColor',
			inherit: 'inherit',
			transparent: 'transparent',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			white: 'hsl(var(--white))',
			black: 'hsl(var(--black))',
			dark: {
				DEFAULT: 'hsl(var(--dark))',
				foreground: 'hsl(var(--dark-foreground))',
			},
			light: {
				DEFAULT: 'hsl(var(--light))',
				foreground: 'hsl(var(--light-foreground))',
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))',
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))',
			},
			tertiary: {
				DEFAULT: 'hsl(var(--tertiary))',
				foreground: 'hsl(var(--tertiary-foreground))',
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))',
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))',
			},
			'accent-two': {
				DEFAULT: 'hsl(var(--accent-two))',
				foreground: 'hsl(var(--accent-two-foreground))',
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))',
			},
			warning: {
				DEFAULT: 'hsl(var(--warning))',
				foreground: 'hsl(var(--warning-foreground))',
			},
			gray: {
				0: 'hsl(var(--gray-0))',
				1: 'hsl(var(--gray-1))',
				2: 'hsl(var(--gray-2))',
				3: 'hsl(var(--gray-3))',
				4: 'hsl(var(--gray-4))',
				5: 'hsl(var(--gray-5))',
			},
			success: {
				DEFAULT: 'hsl(var(--success))',
				foreground: 'hsl(var(--success-foreground))',
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))',
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))',
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				1: 'hsl(var(--chart-1))',
				2: 'hsl(var(--chart-2))',
				3: 'hsl(var(--chart-3))',
				4: 'hsl(var(--chart-4))',
				5: 'hsl(var(--chart-5))',
			},
			sidebar: {
				DEFAULT: 'hsl(var(--sidebar-background))',
				foreground: 'hsl(var(--sidebar-foreground))',
				primary: 'hsl(var(--sidebar-primary))',
				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
				accent: 'hsl(var(--sidebar-accent))',
				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
				border: 'hsl(var(--sidebar-border))',
				ring: 'hsl(var(--sidebar-ring))',
			},
		},

		extend: {
			borderRadius: {
				none: '0px',
				lg: 'var(--radius-lg)',
				md: 'var(--radius)',
				sm: 'var(--radius-sm)',
				full: '9999px',
			},
			borderWidth: {
				none: 'var(--bw-none)',
				sm: 'var(--bw-sm)',
				md: 'var(--bw-md)',
				lg: 'var(--bw-lg)',
			},
			boxShadow: {
				1: 'var(--shadow-1)',
				2: 'var(--shadow-2)',
				3: 'var(--shadow-3)',
				4: 'var(--shadow-4)',
				5: 'var(--shadow-5)',
				6: 'var(--shadow-6)',
				kbd: 'var(--kbd-box-shadow)',
			},
			fontSize: {
				h1: ['2.125rem', { lineHeight: '2.625rem', fontWeight: 700 }], // 34px, 42px
				h2: ['1.875rem', { lineHeight: '2.375rem', fontWeight: 700 }], // 30px, 38px
				h3: ['1.625rem', { lineHeight: '2.125rem', fontWeight: 700 }], // 26px, 34px
				h4: ['1.5rem', { lineHeight: '2rem', fontWeight: 700 }], // 24px, 32px
				h5: ['1.375rem', { lineHeight: '1.875rem', fontWeight: 700 }], // 22px, 30px

				'subheading-1': ['1.5rem', { lineHeight: '2rem' }],
				'subheading-2': ['1.375rem', { lineHeight: '1.875rem' }],
				'subheading-3': ['1.25rem', { lineHeight: '1.75rem' }],
				'subheading-4': ['1.125rem', { lineHeight: '1.625rem' }],
				'subheading-5': ['1rem', { lineHeight: '1.5rem' }],

				'body-1': ['1rem', { lineHeight: '1.5rem' }], // 16px, 24px
				'body-2': ['0.875rem', { lineHeight: '1.25rem' }], // 14px, 20px
				'body-3': ['0.75rem', { lineHeight: '1.125rem' }], // 12px, 18px

				'button-sm': ['0.75rem', { lineHeight: '1.125rem' }],
				'button-md': ['0.875rem', { lineHeight: '1.25rem' }],
				'button-lg': ['1rem', { lineHeight: '1.5rem' }],
				'button-xl': ['1.125rem', { lineHeight: '1.625rem' }],

				'link-l': ['1rem', { lineHeight: '1.5rem' }],
				'link-m': ['0.875rem', { lineHeight: '1.375rem' }],
				'link-s': ['0.75rem', { lineHeight: '1.125rem' }],
			},

			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'collapsible-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-collapsible-content-height)' },
				},
				'collapsible-up': {
					from: { height: 'var(--radix-collapsible-content-height)' },
					to: { height: 0 },
				},
				heartbeat: {
					'0%, 100%': { fillOpacity: '1' },
					'50%': { fillOpacity: '0' },
				},
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				fadeOut: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				ellipsis: {
					'0%': { content: '""' },
					'33%': { content: '"."' },
					'66%': { content: '".."' },
					'100%': { content: '"..."' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'collapsible-down': 'collapsible-down 0.2s ease-in-out',
				'collapsible-up': 'collapsible-up 0.2s ease-in-out',
				heartbeat: 'heartbeat 1.2s infinite ease-in-out',
				'fade-in': 'fadeIn 0.5s ease-out',
				'fade-out': 'fadeOut 0.5s ease-in',
				'fade-in-slow': 'fadeIn 0.6s ease-out',
				shimmer: 'shimmer 3s infinite linear',
				ellipsis: 'ellipsis 2s infinite steps(4, end)',
			},
			screens: {
				xs: '375px',
				'3xl': '1765px',
			},
			typography: {
				DEFAULT: {
					css: {
						'max-width': '100%',
						'--tw-prose-body': 'hsl(var(--gray-4))',
						'--tw-prose-headings': 'hsl(var(--gray-5))',
						'--tw-prose-links': 'hsl(var(--secondary))',
						'--tw-prose-list': 'hsl(var(--gray-5))',
						'--tw-prose-invert-body': 'hsl(var(--gray-4))',
						'--tw-prose-invert-headings': 'hsl(var(--gray-5))',
						'--tw-prose-invert-links': 'hsl(var(--secondary))',
						'--tw-prose-invert-list': 'hsl(var(--gray-5))',
						body: { color: 'var(--tw-prose-body)' },
						p: { color: 'var(--tw-prose-body)' },
						'h1, h2, h3, h4, h5, h6': { color: 'var(--tw-prose-headings)' },
						'li, ol': { color: 'var(--tw-prose-list)' },
					},
				},
			},
			containers: {
				'8xl': '88rem',
				'9xl': '96rem',
				'10xl': '104rem',
				'11xl': '112rem',
				'12xl': '120rem',
			},
			transitionDuration: {
				5000: '5000ms',
			},
		},
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('night', '&:where(.night, .night *)')
		},
	],
}
