"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const initialPieces = [
    { id: 'redSquareOpen1', img: '/carré rouge ouvert.jpeg', color: 'red', shape: 'square', type: 'open' },
    { id: 'redSquareOpen2', img: '/carré rouge ouvert copy.jpeg', color: 'red', shape: 'square', type: 'open' },
    { id: 'redSquareFull1', img: '/Carré_rouge.svg.png', color: 'red', shape: 'square', type: 'full' },
    { id: 'redSquareFull2', img: '/Carré_rouge.svg copy.png', color: 'red', shape: 'square', type: 'full' },
    { id: 'redCircleOpen1', img: '/rond rouge ouvert.png', color: 'red', shape: 'circle', type: 'open' },
    { id: 'redCircleOpen2', img: '/rond rouge ouvert copy.png', color: 'red', shape: 'circle', type: 'open' },
    { id: 'redCircleFull1', img: '/rond rouge.png', color: 'red', shape: 'circle', type: 'full' },
    { id: 'redCircleFull2', img: '/rond rouge copy.png', color: 'red', shape: 'circle', type: 'full' },
    { id: 'blackSquareOpen1', img: '/Carré noirs ouvert.png', color: 'black', shape: 'square', type: 'open' },
    { id: 'blackSquareOpen2', img: '/Carré noirs ouvert copy.png', color: 'black', shape: 'square', type: 'open' },
    { id: 'blackSquareFull1', img: '/carrée noirs.jpeg', color: 'black', shape: 'square', type: 'full' },
    { id: 'blackSquareFull2', img: '/carrée noirs copy.jpeg', color: 'black', shape: 'square', type: 'full' },
    { id: 'blackCircleOpen1', img: '/rond noirs ouvert.png', color: 'black', shape: 'circle', type: 'open' },
    { id: 'blackCircleOpen2', img: '/rond noirs ouvert copy.png', color: 'black', shape: 'circle', type: 'open' },
    { id: 'blackCircleFull1', img: '/rond noirs.jpeg', color: 'black', shape: 'circle', type: 'full' },
    { id: 'blackCircleFull2', img: '/rond noirs copy.jpeg', color: 'black', shape: 'circle', type: 'full' }
];

type Piece = {
    id: string;
    img: string;
    color: string;
    shape: string;
    type: string;
};

const Page: React.FC = () => {
    const [boardState, setBoardState] = useState<Array<Piece | null>>(Array(16).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const [gameMessage, setGameMessage] = useState<string>(`Le joueur 1 joue (Rouge)`);
    const [availablePieces, setAvailablePieces] = useState<Piece[]>(initialPieces);

    const updateGameInfo = useCallback(() => {
        setGameMessage(`Le joueur ${currentPlayer} joue (${currentPlayer === 1 ? 'Rouge' : 'Noir'})`);
    }, [currentPlayer]);

    useEffect(() => {
        updateGameInfo();
    }, [updateGameInfo]);

    const handleDragStart = (e: React.DragEvent<HTMLImageElement>, piece: Piece) => {
        if ((currentPlayer === 1 && piece.color === 'red') || (currentPlayer === 2 && piece.color === 'black')) {
            e.dataTransfer.setData('text/plain', piece.id);
        } else {
            e.preventDefault(); // Prevent the drag if it's not the player's turn
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        const pieceId = e.dataTransfer.getData('text/plain');
        const piece = availablePieces.find(p => p.id === pieceId);

        if (piece && !boardState[index]) {
            const newBoardState = [...boardState];
            newBoardState[index] = piece;
            setBoardState(newBoardState);
            setAvailablePieces(availablePieces.filter(p => p.id !== pieceId)); // Remove piece from available pieces

            if (checkWin(newBoardState)) {
                setGameMessage(`Le joueur ${currentPlayer} (${currentPlayer === 1 ? 'Rouge' : 'Noir'}) gagne!`);
            } else if (newBoardState.every(cell => cell !== null)) {
                setGameMessage('Match nul!');
            } else {
                switchPlayer();
            }
        }
    };

    const checkWin = (board: Array<Piece | null>) => {
        const winPatterns = [
            [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Rows
            [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Columns
            [0, 5, 10, 15], [3, 6, 9, 12] // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c, d] = pattern;
            if (board[a] && board[b] && board[c] && board[d]) {
                const { color: colorA, shape: shapeA, type: typeA } = board[a]!;
                const { color: colorB, shape: shapeB, type: typeB } = board[b]!;
                const { color: colorC, shape: shapeC, type: typeC } = board[c]!;
                const { color: colorD, shape: shapeD, type: typeD } = board[d]!;

                return (
                    (colorA === colorB && colorA === colorC && colorA === colorD) ||
                    (shapeA === shapeB && shapeA === shapeC && shapeA === shapeD) ||
                    (typeA === typeB && typeA === typeC && typeA === typeD)
                );
            }
            return false;
        });
    };

    const switchPlayer = () => {
        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        setCurrentPlayer(nextPlayer);
    };

    const resetGame = () => {
        setBoardState(Array(16).fill(null));
        setCurrentPlayer(1);
        setGameMessage(`Le joueur 1 joue (Rouge)`);
        setAvailablePieces(initialPieces);
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
            <div id="gameInfo" className="text-2xl font-bold mb-4">{gameMessage}</div>
            <div className="flex mb-4">
                <button onClick={resetGame} className="bg-red-600 text-white py-2 px-4 rounded mr-2">Recommencer la Partie</button>
                <button className="bg-red-600 text-white py-2 px-4 rounded">
                    <a href="/userInterface" className="text-white">Retourner commander</a>
                </button>
            </div>
            <div className="flex">
                <div id="leftPieces" className="w-1/4 flex flex-wrap justify-around items-center">
                    {availablePieces.filter(p => p.color === 'red').map(piece => (
                        <Image
                            key={piece.id}
                            src={piece.img}
                            alt={piece.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, piece)}
                            className="w-16 h-16 m-2 cursor-pointer"
                            width={64}
                            height={64}
                        />
                    ))}
                </div>
                <div id="board" className="w-1/2 grid grid-cols-4 grid-rows-4 gap-2 p-4 bg-white shadow-lg">
                    {boardState.map((piece, index) => (
                        <div
                            key={index}
                            className="w-full h-24 border border-gray-300 flex items-center justify-center"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            {piece && <Image src={piece.img} alt={piece.id} className="w-16 h-16" width={64} height={64} />}
                        </div>
                    ))}
                </div>
                <div id="rightPieces" className="w-1/4 flex flex-wrap justify-around items-center">
                    {availablePieces.filter(p => p.color === 'black').map(piece => (
                        <Image
                            key={piece.id}
                            src={piece.img}
                            alt={piece.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, piece)}
                            className="w-16 h-16 m-2 cursor-pointer"
                            width={64}
                            height={64}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
