import React, { useState } from 'react'
import './App.css'
import { ICard } from './model'

const App: React.FC = () => {
	// Default cards
	const [cardList, setCardList] = useState<ICard[]>([
		{
			id: 1,
			order: 2,
			title: 'Тестовая карточка, вторая.',
			createdAt: new Date().toLocaleString(),
		},
		{
			id: 2,
			order: 4,
			title: 'Тестовая карточка, четвёртая.',
			createdAt: new Date().toLocaleString(),
		},
		{
			id: 3,
			order: 3,
			title: 'Тестовая карточка, третья.',
			createdAt: new Date().toLocaleString(),
		},
		{
			id: 4,
			order: 1,
			title: 'Тестовая карточка, первая.',
			createdAt: new Date().toLocaleString(),
		},
	])

	// Current card
	const [currentCard, setCurrentCard] = useState<ICard>({
		title: '',
		id: 0,
		createdAt: '',
		order: 0,
	})

	// Drag and drop handlers

	const dragStartHandler = (
		e: React.DragEvent<HTMLDivElement>,
		card: ICard
	) => {
		console.log('drag', card)
		setCurrentCard(card)
	}

	const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.background = 'white'
	}

	const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.currentTarget.style.background = 'lightgray'
	}

	const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
		e.preventDefault()
		setCardList(
			cardList.map(c => {
				if (c.id === card.id) {
					return { ...c, order: currentCard.order }
				}
				if (c.id === currentCard.id) {
					return { ...c, order: card.order }
				}
				return c
			})
		)
		e.currentTarget.style.background = 'white'
	}

	const sortCards = (a: ICard, b: ICard) => {
		if (a.order > b.order) {
			return 1
		} else {
			return -1
		}
	}

	// Render react

	return (
		<div className='app'>
			{cardList.sort(sortCards).map(card => (
				<div
					onDragStart={e => dragStartHandler(e, card)}
					onDragLeave={e => dragEndHandler(e)}
					onDragEnd={e => dragEndHandler(e)}
					onDragOver={e => dragOverHandler(e)}
					onDrop={e => dropHandler(e, card)}
					draggable={true}
					className={'card'}
				>
					{card.title}
				</div>
			))}
		</div>
	)
}

export default App
