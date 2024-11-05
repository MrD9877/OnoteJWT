import React, { useEffect, useRef, useState } from 'react'
import ReactPopover from '../utility/ReactPopover.js'
import Timer from '../utility/Timer.js'

export default function Tennisgame(props) {
    const c = useRef()
    const [playerY, setplayerY] = useState(30)
    const [ballX, setBallX] = useState()
    const [ballY, setBallY] = useState()
    const [vectorX, setVetorX] = useState(true)
    const [vectorY, setVetorY] = useState(true)
    const [gameStart, setGameStart] = useState(false)
    const [gameEnd, setGameEnd] = useState(false)
    const [ballSpeed, setBallSpeed] = useState(0.4)
    const [canvas, setCanvas] = useState()
    const [ctx, setCtx] = useState()
    const [i, setI] = useState(2)
    const [score, setScore] = useState('00:00')
    const [playerVector, setPlayerVector] = useState(true)
    const [touchPad, setTouchPad] = useState({})
    let gravity = 0.02
    let playerGvelocity = 2

    const incrementBallSpeed = () => {
        const speedMultipliyer = 1.1
        if (ballSpeed < 4) {
            setBallSpeed(pre => Math.floor(pre * speedMultipliyer * 10000) / 10000)
        }
    }

    const randomVectorGenerator = () => {
        const num = Math.random()
        if (num >= 0.5) {
            return true
        }
        if (num < 0.5) {
            return false
        }
    }

    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    const setBallPath = () => {
        // if canvas preventing to set ball when canvas in not loaded yet 
        if (canvas) {
            // i = 2 is preventing double refresh of restartgame to reseting ball coordinates 
            if (i === 2) {
                setBallX(() => {
                    const cw = canvas.width
                    let xOfball;
                    const randomNumber = Math.random()
                    xOfball = cw / 2 * randomNumber + cw / 4;
                    return xOfball
                }
                )

                setBallY(() => ((0.6 * canvas.height) * Math.random()) + canvas.height / 6)
                setVetorX(() => {
                    let v = randomVectorGenerator()
                    return v;
                })
                setVetorY(() => {
                    let v = randomVectorGenerator()
                    return v;
                })
            }
        }
    }

    const handleTouch = (e) => {
        if (!gameStart) startGame()
        setPlayerVector(false)
    }
    const handleEndTouch = () => {
        setTouchPad({ background: "rgba(0,0,0,0)", color: "rgba(0,0,0,0)" })
        setPlayerVector(true)
    }

    const handleKeys = (e) => {
        // move player 
        switch (e.key) {
            case "W":
            case "w":
                setPlayerVector(false)
                break;
            default:
                break;
        }
    }

    const animateball = () => {
        // ball out of bound 

        if (ballX < 0) {
            stopGame()
            setGameEnd(true)
            // restartGame(canvas)
            return
        }

        // bounce ball 
        if (ballX >= canvas.width - props.ballRaidus) {
            incrementBallSpeed()
            setVetorX(() => false)
        }
        if (ballY >= canvas.height - props.ballRaidus) {
            incrementBallSpeed()
            setVetorY(() => false)
        }
        if (ballY <= 0 + props.ballRaidus) {
            incrementBallSpeed()
            setVetorY(() => true)
        }
        if (ballX - props.ballRaidus >= props.playerX && ballX - props.ballRaidus <= props.playerX + props.playerWidth) {
            if (ballY >= playerY && ballY < playerY + props.playerHeight) {
                setVetorX(() => true)
            }
        }
        // move ball 
        if (!gameStart) return
        setBallX(() => {
            const dx = Math.floor(ballSpeed * 100) / 100
            if (vectorX) return ballX + dx;
            if (!vectorX) return ballX - dx;
        })

        setBallY((pre) => {
            const dx = Math.floor(ballSpeed * 100) / 100
            if (vectorY) return pre + dx;
            if (!vectorY) return pre - dx;
        })
    }

    const darwBall = () => {
        ctx.beginPath()
        ctx.arc(ballX, ballY, props.ballRaidus, 0, Math.PI * 2)
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "black"
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }

    const darwPlayer = () => {
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath()
        ctx.fillRect(props.playerX, playerY, props.playerWidth, props.playerHeight);
        ctx.fill()
    }

    const animePlayer = () => {
        if (!playerVector) {
            if (playerY > 0) {
                setplayerY(pre => pre - playerGvelocity)
            }
        } else {
            if (playerY < canvas.height - props.playerHeight) {
                setplayerY(pre => pre + playerGvelocity)
                playerGvelocity = playerGvelocity + playerGvelocity * gravity
            }
        }
    }

    const drawCanvas = () => {
        darwBall()
        darwPlayer()
    }
    const startGame = () => {
        setBallSpeed(0.5)
        setGameStart(true)
        setGameEnd(false)
        setI(2)
    }

    const stopGame = () => {
        setGameStart(false)
    }

    const restartGame = async () => {
        setTouchPad({})
        stopGame()
        setGameEnd(true)
        clearCanvas()
        setplayerY(canvas.height / 2 - props.playerHeight / 2)
        setBallPath()
        drawCanvas()
        // loop to re render restartGame for strict mode 
        if (i !== 0) {
            setI(pre => pre - 1)
        }
    }

    // setting canvas and ctx 
    useEffect(() => {
        setCanvas(() => c.current)
        setCtx(() => c.current.getContext("2d"))
    }, [])

    /* eslint-disable */

    // set ball coodinates for 1st game 
    useEffect(() => {
        setBallPath()
    }, [canvas])

    // refresh when restart 
    useEffect(() => {
        if (i === 1) {
            setI((pre) => pre - 1)
            restartGame()
        }
    }, [i])

    // animate 
    const anime = () => {
        if (!gameStart || canvas === undefined) return

        clearCanvas()

        drawCanvas()

        animateball()

        animePlayer()
    }
    requestAnimationFrame(anime)
    return (
        <>
            <div className='flex flex-col m-auto p-48 justify-center align-middle items-center ' style={{ maxHeight: "78vh" }}>
                <div className='text-white bg-slate-500 px-2 py-1 mb-5 border-black rounded w-32'>
                    <span>
                        Your best:    {score}
                    </span>
                </div>
                <div className='flex justify-around'>
                    <div className='flex justify-evenly align-middle mr-32'>
                        <ReactPopover
                            content={
                                <p>Pause</p>
                            }
                        >
                            <button onClick={stopGame} className=''>
                                <lord-icon
                                    src="https://cdn.lordicon.com/aklfruoc.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                >
                                </lord-icon>
                            </button>
                        </ReactPopover>
                        <ReactPopover
                            content={
                                <p>Restart</p>
                            }
                        >
                            <button onClick={restartGame}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/rsbokaso.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                >
                                </lord-icon>
                            </button>
                        </ReactPopover>
                    </div>
                    <div className='text-white m-auto flex align-middle' >
                        <Timer gameStart={gameStart} setScore={setScore} gameEnd={gameEnd} />
                    </div>
                </div>
                <canvas tabIndex="0" style={{ background: "#424242" }} onClick={startGame} onKeyDown={handleKeys} onKeyUp={() => setPlayerVector(true)} ref={c} height={props.canvasHeight} width={props.canvasWidth}> </canvas>
                <div style={touchPad} onTouchStart={handleTouch} onTouchEnd={handleEndTouch} class="touchDisable rounded-full p-4 mt-4 bg-slate-100">Touch Here</div>
            </div>
        </>
    )
}
