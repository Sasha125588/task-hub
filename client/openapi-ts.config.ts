import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
	input: 'http://localhost:8080/swagger/doc.json',
	output: {
		format: 'prettier',
		path: 'generated/api'
	},
	plugins: ['@hey-api/typescript']
})
