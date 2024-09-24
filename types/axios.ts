import type { H3Error } from 'h3';

declare module 'axios' {
	interface AxiosResponse<T = any, D = any> {
		error?: H3Error;
	}
}
