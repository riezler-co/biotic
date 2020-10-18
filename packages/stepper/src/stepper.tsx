import React,
		 { useReducer
		 , createContext
		 , useContext
		 , Children
		 , useEffect
		 , useMemo
		 , useCallback
		 , Suspense
		 } from 'react';

export interface State {
	steps: number;
	step: number;
	data: { [key:string]: any };
	infos: Array<any>;
	names: Array<string | number>;
	defaultData: any;
}

export let initialState: State =
	{ steps: 0
	, step: 0
	, data: {}
	, infos: []
	, names: []
	, defaultData: {}
	}

export interface CtxState {
	state: State;
	dispatch: React.Dispatch<any>;
};

export let StepperCtx = createContext<CtxState>({
	state: initialState,
	dispatch: () => null
})

export type Action =
	| { type: 'setSteps', steps: number, names: Array<string | number>, infos: Array<any> }
	| { type: 'next' }
	| { type: 'prev' }
	| { type: 'setData', key: string, data: any }
;

export function reducer(state: State, action: Action): State {
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
			}

		case 'prev': 
			return {
				...state,
				step: state.step - 1,
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

export interface StepperProps {
	children?: JSX.Element | Array<JSX.Element>;
	defaultData?: any
}

export function Stepper({ children, defaultData }: StepperProps) {
	let [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StepperCtx.Provider value={{ state: { ...state, defaultData }, dispatch }}>
			{ children }
		</StepperCtx.Provider>
	)
}

export interface StepProps {
	children?: JSX.Element | Array<JSX.Element>;
}

export function Steps(props: StepProps) {
	let { state, dispatch } = useContext(StepperCtx)
	let children = useMemo(() => Children.toArray(props.children), [props.children]) as Array<JSX.Element>

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

export function useNext() {
	let { state, dispatch } = useContext(StepperCtx)
	let onNext = useCallback(() => dispatch({ type: 'next' }), [dispatch])
	let allowNext = state.step + 1 < state.steps 
	return allowNext ? onNext : null
}

export function usePrev() {
	let { state, dispatch } = useContext(StepperCtx)
	let onPrev = useCallback(() => dispatch({ type: 'prev' }), [dispatch])
	let allowPrev = state.step > 0
	return allowPrev ? onPrev : null
}

export interface ControlsProps {
	children?: JSX.Element | Array<JSX.Element>;
}

export function Controls({ children }: ControlsProps) {
	let onPrev = usePrev()
	let onNext = useNext()
	
	return React.cloneElement(children as React.ReactElement<any>,  {
		onPrev,
		onNext
	})
}

export function useProgress() {
	let { state } = useContext(StepperCtx)
	
	let data = {
		...state.defaultData,
		...state.data
	}

	return { ...state, data }
}

export interface ProgressProps {
	children?: JSX.Element | Array<JSX.Element>;
}

export function Progress({ children }: ProgressProps) {
	let { state } = useContext(StepperCtx)

	if (children === undefined) {
		return null
	}

	return React.cloneElement(children as React.ReactElement<any>, {
		steps: state.steps,
		step: state.step,
		data: state.data,
		infos: state.infos,
		names: state.names
	}) 
} 

export function useData(initialState: any) {
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

export function useInfo(step: number, infos: any) {
	return useMemo(() => infos[step] || {}, [step, infos])
}

function getInfo(node: JSX.Element) {
	return node.props.info || {}
}

function getName(node: JSX.Element, index: number) {
	return node.props.name ? node.props.name : index
}