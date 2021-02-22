import React, { FC } from 'react'
import styled, { css } from 'styled-components'

type LoadingProps = {
	size?: string | number;
	color?: string;
}

function getSize(size: string | number) {
	if (typeof size === 'string') {
		return size
	}

	return `${size}px`
}

let Config = css<LoadingProps>`
	--default-pulse-size: var(--loading-size, var(--baseline-5));
	--default-pulse-color: var(--loading-color, currentColor);

	--size: ${p => p.size ? getSize(p.size) : 'var(--default-pulse-size)'};
	--color: ${p => p.color ? p.color : 'var(--default-pulse-color)'};
`

export let Pulse = styled.div<LoadingProps>`
	${Config}
	
	width: var(--size);
	height: var(--size);
	background-color: var(--color);
	border-radius: 100%;
	animation: sk-pulse 1.2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);

	@keyframes sk-pulse {
	  0% {
	    transform: scale(0); 
	  } 100% {
	    transform: scale(1);
	    opacity: 0; 
	  }
	}
`

let StyledBounce = styled.div<LoadingProps>`
	${Config}

	width: var(--size);
	height: var(--size);
	position: relative;

	.sk-bounce-dot {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: var(--color);
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;
		animation: sk-bounce 2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955); 
	}

	.sk-bounce-dot:nth-child(2) {
		animation-delay: -1.0s;
	}

	@keyframes sk-bounce {
	  0%, 100% {
	    transform: scale(0);
	  } 45%, 55% {
	    transform: scale(1); 
	  } 
	}

`

export let Bounce: FC<LoadingProps> = (props) => {
	return (
		<StyledBounce {...props}>
		    <div className="sk-bounce-dot"></div>
        	<div className="sk-bounce-dot"></div>
		</StyledBounce>
	)
}


let StyledFlow = styled.div`
	${Config}

	width: calc(var(--size) * 1.3);
	height: calc(var(--size) * 1.3);
	display: flex;
	justify-content: space-between;
	align-items: center;

	.sk-flow-dot {
	  width: 25%;
	  height: 25%;
	  background-color: var(--color);
	  border-radius: 50%;
	  animation: sk-flow 1.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite both;
	}

	.sk-flow-dot:nth-child(1) { animation-delay: -0.30s; }
	.sk-flow-dot:nth-child(2) { animation-delay: -0.15s; }

	@keyframes sk-flow {
	  0%, 80%, 100% {
	    transform: scale(0.3); }
	  40% {
	    transform: scale(1); 
	  }
	}

`

export let Flow: FC<LoadingProps> = (props) => {
	return (
		<StyledFlow {...props}>
			<div className="sk-flow-dot"></div>
			<div className="sk-flow-dot"></div>
			<div className="sk-flow-dot"></div>
		</StyledFlow>
	)
}

let StyledCircleFade = styled.div`
	${Config}

	width: var(--size);
	height: var(--size);
	position: relative; 

	.sk-circle-fade-dot {
	  width: 100%;
	  height: 100%;
	  position: absolute;
	  left: 0;
	  top: 0; 
	}

	.sk-circle-fade-dot:before {
	  content: '';
	  display: block;
	  width: 15%;
	  height: 15%;
	  background-color: var(--color);
	  border-radius: 100%;
	  animation: sk-circle-fade 1.2s infinite ease-in-out both; 
	}

	.sk-circle-fade-dot:nth-child(1)  { transform: rotate(30deg);  }
	.sk-circle-fade-dot:nth-child(2)  { transform: rotate(60deg);  }
	.sk-circle-fade-dot:nth-child(3)  { transform: rotate(90deg);  }
	.sk-circle-fade-dot:nth-child(4)  { transform: rotate(120deg); }
	.sk-circle-fade-dot:nth-child(5)  { transform: rotate(150deg); }
	.sk-circle-fade-dot:nth-child(6)  { transform: rotate(180deg); }
	.sk-circle-fade-dot:nth-child(7)  { transform: rotate(210deg); }
	.sk-circle-fade-dot:nth-child(8)  { transform: rotate(240deg); }
	.sk-circle-fade-dot:nth-child(9)  { transform: rotate(270deg); }
	.sk-circle-fade-dot:nth-child(10) { transform: rotate(300deg); }
	.sk-circle-fade-dot:nth-child(11) { transform: rotate(330deg); }
	.sk-circle-fade-dot:nth-child(1):before  { animation-delay: -1.1s; }
	.sk-circle-fade-dot:nth-child(2):before  { animation-delay: -1.0s; }
	.sk-circle-fade-dot:nth-child(3):before  { animation-delay: -0.9s; }
	.sk-circle-fade-dot:nth-child(4):before  { animation-delay: -0.8s; }
	.sk-circle-fade-dot:nth-child(5):before  { animation-delay: -0.7s; }
	.sk-circle-fade-dot:nth-child(6):before  { animation-delay: -0.6s; }
	.sk-circle-fade-dot:nth-child(7):before  { animation-delay: -0.5s; }
	.sk-circle-fade-dot:nth-child(8):before  { animation-delay: -0.4s; }
	.sk-circle-fade-dot:nth-child(9):before  { animation-delay: -0.3s; }
	.sk-circle-fade-dot:nth-child(10):before { animation-delay: -0.2s; }
	.sk-circle-fade-dot:nth-child(11):before { animation-delay: -0.1s; }

	@keyframes sk-circle-fade {
	  0%, 39%, 100% {
	    opacity: 0;
	    transform: scale(0.6);
	  } 40% {
	    opacity: 1; 
	    transform: scale(1);
	  }
	}

`

export let CircleFade: FC<LoadingProps> = (props) => {
	return (
		<StyledCircleFade {...props}>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
			<div className="sk-circle-fade-dot"></div>
		</StyledCircleFade>
	)
}