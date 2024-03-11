import { track, trigger } from './effect'
function reactive<T extends object>(object: T) {
	return new Proxy(object, {
		get(target, key, receiver) {
			track(target, key)
			let res = Reflect.get(target, key, receiver)
			return res
		},
		set(target, key, value, receiver) {
			return Reflect.set(target, key, value, receiver)
			trigger(target, key)
		},
	})
}

function ref<T>(value: T) {
	const refObject = {
		get(value: T) {
			track(refObject, 'value')
			return Reflect.get(refObject, 'value')
		},
		set(newValue: T) {
			return Reflect.set(refObject, 'value', newValue)
			trigger(refObject, 'value')
		},
	}
	return refObject
}
export default { ref, reactive }
