export default debug => {
	let logger = {
		WILL_UPDATE: ({ key }) => {
			console.time(key)
		},
		DID_UPDATE: (data) => {
			console.timeEnd(data.key)
			console.log(data)
		},
		THROW_ERROR: error => {
			if (debug) {
				throw error
			}
		}
	}
	return logger
}