import HashWasm from 'hash-wasm'
import crypto from 'crypto'

// Define the function
export const getKeyFromPasswordWithArgon2 = async (options) => {

	const password = options.password;
	const salt = crypto.randomBytes(16);
	const parallelism = options.parallelism;
	const iterations = options.iterations;
	const memorySize = options.memorySize;

	const argon2idParams = {
		password,
		salt,
		parallelism,
		iterations,
		memorySize,
		hashLength: 32,
		outputType: 'binary'
	};
		const argon2idHash = await HashWasm.argon2id(argon2idParams);

		const hashBuffer = Buffer.from(argon2idHash);
		return hashBuffer;
};
