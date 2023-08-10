import crypto from 'crypto'

import { NativeModules } from 'react-native';

const { RNArgon2 } = NativeModules;

// Define the function
export const getKeyFromPasswordWithArgon2 = async (options) => {

	const { passphrase, parallelism, password, iterations } = options
	const memorySize = options.memorySize
	const salt = crypto.randomBytes(16).toString('hex');
	const iv = crypto.randomBytes(12);
	const result = await RNArgon2.argon2(password, salt, {
		iterations,
		memory: memorySize,
		parallelism,
		hashLength: 32,
		mode: 'argon2id'
	});
	console.log({ result })

	const key = Buffer.from(result.rawHash, 'hex');
	// encodedHash: $argon2id$v=19$m=16384,t=1,p=4$Wd+kUlRk6kE49Q/PbxmzULK4Uq73cO3jOqZpaWH3PDc$V78s5Yd0dEqwA92/tzxjPVdNzOE
	// rawHash: 57bf2ce58774744ab003ddbfb73c633d574dcce1

	const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
	const firstBlock = Buffer.isBuffer(passphrase)
		? cipher.update(passphrase)
		: cipher.update(passphrase, 'utf8');
	const encrypted = Buffer.concat([firstBlock, cipher.final()]);
	const tag = cipher.getAuthTag();
	const encryptedData = {
		ciphertext: encrypted.toString('hex'),
		mac: crypto.createHash('sha256').update(key.slice(16, 32)).update(encrypted).digest('hex'),
		kdf: "argon2id",
		kdfparams: {
			parallelism,
			iterations,
			memorySize,
			salt,
		},
		cipher: "aes-256-gcm",
		cipherparams: {
			iv: iv.toString('hex'),
			tag: tag.toString('hex'),
		},
		version: "1",
	};

	console.log({
		crypto: encryptedData,
		metadata: {
			name: 'attract_guy',
			pubkey: "6abcd865404546b48d51411636e3f9464f6b42da4c3743b69e2cb680f53f8b31",
			path: "m/44'/134'/0'",
			address: 'lsk2447tv63fubjrqpkfn7e9e3zhhwnuhzyhmvhqw',
			creationTime: new Date().toISOString(),
		},
		version: 1,
	})
};
