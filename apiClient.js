import axios from 'axios';
import { fetch } from 'react-native-ssl-pinning';

const trySslPinning = (baseURL, certs, url) => {
	const instance = axios.create({
		adapter: () => {
			return fetch(baseURL, { sslPinning: { certs: certs } })
		},
		...this.axiosConfig,
		baseURL: baseURL,
	});

	return instance.get(url)
}

export default trySslPinning
