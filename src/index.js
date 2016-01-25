const attr = 'info' in console ? 'info' : "log"
const pad = num => ('0' + num).slice(-2)

const timeStore = {}
const getTime = () => new Date().getTime()

const createLogger = ({ scope="ROOT", debug }) => {
	const logger = {
		DISPATCH: data => {
			timeStore[scope] = getTime()
			return data
		},
		DID_UPDATE: data => {
			let { key, value, currentState, nextState } = data
			const time = new Date()
			const formattedTime = `${ time.getHours() }:${ pad(time.getMinutes()) }:${ pad(time.getSeconds()) }`
			const takeTime = (getTime() - timeStore[scope]).toFixed(2)
			const message = `${ scope }: action [${ key }] end at ${ formattedTime }, take ${ takeTime }ms`

			try {
				console.groupCollapsed(message)
			} catch (e) {
				try {
					console.group(message)
				} catch (e) {
					console.log(message)
				}
			}

			if (attr === 'log') {
				console[attr](value)
				console[attr](currentState)
				console[attr](nextState)
			} else {
				console[attr](`%c value`, `color: #03A9F4; font-weight: bold`, value)
				console[attr](`%c prev state`, `color: #9E9E9E; font-weight: bold`, currentState)
				console[attr](`%c next state`, `color: #4CAF50; font-weight: bold`, nextState)
			}

			try {
				console.groupEnd()
			} catch (e) {
				console.log('-- log end --')
			}

			return data
		},
		THROW_ERROR: error => {
			if (debug) {
				throw error
			}
			return error
		}
	}
	return logger
}

export default createLogger