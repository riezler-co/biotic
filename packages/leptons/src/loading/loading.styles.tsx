import { css } from '@emotion/css'

export let base = css`
	--_size: var(--loading-size, var(--size-7));
	--_color: var(--loading-color, currentColor);
`

export let pulse = css`
	${base}
	width: var(--_size);
	height: var(--_size);
	background-color: var(--_color);
	border-radius: 100%;
	animation: loading-pulse 1.2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);

	@keyframes loading-pulse {
	  0% {
	    transform: scale(0); 
	  } 100% {
	    transform: scale(1);
	    opacity: 0; 
	  }
	}
`

export let bounce = css`
	${base}
	width: var(--_size);
	height: var(--_size);
	position: relative;
`

export let bounceDot = css`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: var(--_color);
	opacity: 0.6;
	position: absolute;
	top: 0;
	left: 0;
	animation: loading-bounce 2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);

	&:nth-child(2) {
		animation-delay: -1.0s;
	}

	@keyframes loading-bounce {
	  0%, 100% {
	    transform: scale(0);
	  } 45%, 55% {
	    transform: scale(1); 
	  } 
	}
`

export let flow = css`
	${base}
	width: calc(var(--_size) * 1.3);
	height: calc(var(--_size) * 1.3);
	display: flex;
	justify-content: space-between;
	align-items: center;
`

export let flowDot = css`
	width: 25%;
	height: 25%;
	background-color: var(--_color);
	border-radius: 50%;
	animation: loading-flow 1.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite both;

	&:nth-child(1) { animation-delay: -0.30s; }
	&:nth-child(2) { animation-delay: -0.15s; }

	@keyframes loading-flow {
	  0%, 80%, 100% {
	    transform: scale(0.3); }
	  40% {
	    transform: scale(1); 
	  }
	}
`

export let circleFade = css`
	${base}
	width: var(--_size);
	height: var(--_size);
	position: relative;
`

export let circleFadeDot = css`
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;

	&:before {
		content: '';
		display: block;
		width: 15%;
		height: 15%;
		background-color: var(--_color);
		border-radius: 100%;
		animation: loading-circle-fade 1.2s infinite ease-in-out both;
	}

	&:nth-child(1)  { transform: rotate(30deg);  }
	&:nth-child(2)  { transform: rotate(60deg);  }
	&:nth-child(3)  { transform: rotate(90deg);  }
	&:nth-child(4)  { transform: rotate(120deg); }
	&:nth-child(5)  { transform: rotate(150deg); }
	&:nth-child(6)  { transform: rotate(180deg); }
	&:nth-child(7)  { transform: rotate(210deg); }
	&:nth-child(8)  { transform: rotate(240deg); }
	&:nth-child(9)  { transform: rotate(270deg); }
	&:nth-child(10) { transform: rotate(300deg); }
	&:nth-child(11) { transform: rotate(330deg); }
	&:nth-child(1):before  { animation-delay: -1.1s; }
	&:nth-child(2):before  { animation-delay: -1.0s; }
	&:nth-child(3):before  { animation-delay: -0.9s; }
	&:nth-child(4):before  { animation-delay: -0.8s; }
	&:nth-child(5):before  { animation-delay: -0.7s; }
	&:nth-child(6):before  { animation-delay: -0.6s; }
	&:nth-child(7):before  { animation-delay: -0.5s; }
	&:nth-child(8):before  { animation-delay: -0.4s; }
	&:nth-child(9):before  { animation-delay: -0.3s; }
	&:nth-child(10):before { animation-delay: -0.2s; }
	&:nth-child(11):before { animation-delay: -0.1s; }

	@keyframes loading-circle-fade {
	  0%, 39%, 100% {
	    opacity: 0;
	    transform: scale(0.6);
	  } 40% {
	    opacity: 1; 
	    transform: scale(1);
	  }
	}
`