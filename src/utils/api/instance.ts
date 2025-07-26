import { ofetch } from 'ofetch'

export const api = ofetch.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL
		? `${process.env.NEXT_PUBLIC_API_URL}api/v1`
		: 'http://localhost:8080/api/v1',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})
