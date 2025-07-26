import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
	input: 'https://task-hub-server.onrender.com/swagger/doc.json',
	output: {
		format: 'prettier',
		path: 'generated/api'
	},
	plugins: ['@hey-api/typescript']
})
