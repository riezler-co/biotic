import React,
		 { useReducer
		 , createContext
		 , useContext
		 , Children
		 , useEffect
		 , useMemo
		 , useCallback
		 , Suspense
		 } from 'react'

export let StepperCtx = createContext({
	state: {},
	dispatch: () => {}
})

export let initialState = {
	steps: 0,
	step: 0,
	wait: false,
	data: {},
	infos: [],
	names: []
}

export function reducer(state, action) {
	switch(action.type) {
		case 'setSteps':
			return {
				...state,
				steps: action.steps,
				infos: action.infos,
				names: action.names,
			}

		case 'next':
			return {
				...state,
				step: state.step + 1,
				wait: action.wait
			}

		case 'prev': 
			return {
				...state,
				step: state.step - 1,
				wait: action.wait
			}

		case 'loaded':
			return {
				...state,
				wait: false
			}

		case 'setData':
			return {
				...state,
				data: {
					...state.data,
					[action.key]: action.data
				}
			}

		default:
			return state
	}
}


export function Stepper({ children, fallback }) {
	let [state, dispatch] = useReducer(reducer, initialState); 

	return (
		<StepperCtx.Provider value={{ state, dispatch }}>
			{ children }
		</StepperCtx.Provider>
	)
}

export function Steps(props) {
	let { state, dispatch } = useContext(StepperCtx)
	let children = useMemo(() => Children.toArray(props.children), [props.children])

	useEffect(() => {

		let infos = children.map(getInfo)
		let names = children.map(getName)

		dispatch({
			type: 'setSteps',
			steps: children.length,
			infos,
			names
		})
	}, [children])

	return children[state.step]  
}

export function AsyncSteps(props) {
	let { state, dispatch } = useContext(StepperCtx)
	let children = useMemo(() => Children.toArray(props.children), [props.children])

	useEffect(() => {

		let infos = children.map(getInfo)
		let names = children.map(getName)

		dispatch({
			type: 'setSteps',
			steps: children.length,
			infos,
			names
		})
	}, [children])

	if (state.wait === false) {
		return children[state.step]  
	}

	let Child = React.lazy(async () => {
		await state.wait
		dispatch({ type: 'loaded' })
		return { default: () => children[state.step] }
	})

	return <Child />
}

export function useNext() {
	let { state, dispatch } = useContext(StepperCtx)
	let onNext = useCallback((wait = false) => dispatch({ type: 'next', wait }), [dispatch])
	let allowNext = state.wait === false && state.step + 1 < state.steps 
	return allowNext ? onNext : null
}

export function usePrev() {
	let { state, dispatch } = useContext(StepperCtx)
	let onPrev = useCallback((wait = false) => dispatch({ type: 'prev', wait }), [dispatch])
	let allowPrev = state.wait === false && state.step > 0
	return allowPrev ? onPrev : null
}

export function Controls({ children }) {
	let onPrev = usePrev()
	let onNext = useNext()
	
	return React.cloneElement(children,  {
		onPrev,
		onNext
	})
}

export function useProgress() {
	let { state } = useContext(StepperCtx)
	return state
}

export function Progress({ children }) {
	let { state } = useContext(StepperCtx)
	return React.cloneElement(children, {
		steps: state.steps,
		step: state.step,
		wait: state.wait,
		data: state.data,
		infos: state.infos,
		names: state.names
	}) 
} 

export function useData(initialState) {
	let { state, dispatch } = useContext(StepperCtx)
	let { step, data, names } = state
	let key = names[step]
	let currentState = data[key]
	let stepData = currentState ? currentState : initialState
	
	let setData = useCallback((data) => {
		dispatch({ type: 'setData', key, data })
	}, [step, key])

	return [stepData, setData]
}

export function useInfo(step, infos) {
	return useMemo(() => infos[step] || {}, [step, infos])
}

function getInfo(node) {
	return node.props.info || {}
}

function getName(node, index) {
	return node.props.name ? node.props.name : index
}