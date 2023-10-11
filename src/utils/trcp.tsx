import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
// import type { AppRouter } from 'bendpays-api/src/server/routers/index'

export const TRPC_URI =
	(process.env.EXPO_PUBLIC_API_URI || 'http://localhost:3000/v1') + '/trpc'

let accessToken: string

export function setTrpcAccessToken(newToken: string) {
	accessToken = newToken
}
/*
export const trpcReact = createTRPCReact<AppRouter>()
export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: TRPC_URI,
			async headers(args) {
				return {
					authorization:
						'Bearer eyJraWQiOiJEbENPbFZ1SnUzdncwTEtHQUJEb3hCcVNPK1phZ2E1RmphQjNvWTdsU0dVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYWQxMDQ1Ny01YzZhLTQ0MmItODU1MC1jNmQwMmU0NTIxYWIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9yTFl1Q1VHY1IiLCJjbGllbnRfaWQiOiI1bXJhNTB1Y3VqbTdhbHRvdm5mdjk0bWtnaSIsIm9yaWdpbl9qdGkiOiI4ODMxNDJiNC1kN2NmLTQwZGQtYWU1Yi0yMTA5ZjZhMzhlMjgiLCJldmVudF9pZCI6ImFhNzNhOGM2LTZjNWYtNDgyMy1iMzM5LTBmNGRkMzdlMDQwOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTcwMjcxMTUsImV4cCI6MTY5NzAzMDc1OSwiaWF0IjoxNjk3MDI3MTYwLCJqdGkiOiJhN2Y3ODA2My1iNzc0LTRjM2MtOTRlMC02ZDgyMTI5OWNlMmYiLCJ1c2VybmFtZSI6IjNhZDEwNDU3LTVjNmEtNDQyYi04NTUwLWM2ZDAyZTQ1MjFhYiJ9.Qt_ZVXOhV908V8EPUCi10-bOw-UqNhTFQEfhaBhvvAXqTux0xbjbl9AI57fOAgjlvaBp5blQ6lm2ejadnhIiP4S3ZY_bc2UfKIAxy_tbzAnDGmfskypKoXG0wE9Y868l3n48Chqtb2nkKx2s_rUJL61m-z3-0FW9LxSHxqhCn6jStfGiUtJvkdDbGwKUYj8zfavYXuGHuk3CRCSOIxXIxeI2gOMw_0u5Qgdy_n3_j0rZRIQv80NwLPby_9Azg2BujDetvYzHNejKkf6HNFtMKeM-79APu7TR_2N5UkZq1RMCpVP4Pn40D-EL3ZlOEoqNy1zs4VzhWb3ka5qwdaTQNw'
				}
			}
		})
	]
})
*/