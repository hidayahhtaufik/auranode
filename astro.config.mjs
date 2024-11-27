import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Auranode',
			social: {
				github: 'https://github.com/hidayahhtaufik',
				telegram: 'https://t.me/hidayahhtaufik',
				twitter: 'https://x.com/hidayahhtaufik',
				discord: 'https://discord.com/users/380222722283798529'
			},
			sidebar: [
				{
					label: 'Airdrop Bot',
					items: [
						{ label: 'Coub Bot', slug: 'airdrop-bot/coub-bot' },
						{ label: 'Hanafuda Bot', slug: 'airdrop-bot/hanafuda-bot' },
						{ label: 'Dawn Validator', slug: 'airdrop-bot/dawn-validator' },
						{ label: 'Bless Network', slug: 'airdrop-bot/bless' },
					],
				},
				{
					label: 'Node Tutorial',
					items: [
						{ label: 'PWR Validator', slug: 'node-tutorial/pwr-validator' },
						{ label: 'Zenrock Validator', slug: 'node-tutorial/zenrock-validator' },
						{ label: 'Ritual Node', slug: 'node-tutorial/ritual-node' },
						{ label: 'Cysic Node', slug: 'node-tutorial/cysic-node' },
						{ label: 'Glacier Node', slug: 'node-tutorial/glacier-node' },
						{ label: 'Spheron Node', slug: 'node-tutorial/spheron-node' },
						{ label: 'Nexus Node', slug: 'node-tutorial/nexus-node' },
					],
				},
				{
					label: 'Building Website',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Building Website', slug: 'website' },
					],
				},
				{
					label: 'Community',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Community', slug: 'community' },
					],
				},
			],
		}),
	],
});
