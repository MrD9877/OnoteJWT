import React, { useEffect, useState } from 'react'
import Tennisgame from '../minigames/Tennisgame.js'



export default function Home() {
    const [record, setRecord] = useState(0)
    const [canvasDimentions, setCanvasDimentions] = useState(0)
    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            setCanvasDimentions({ height: "400px", width: "350px" })
        } else {
            setCanvasDimentions({ height: "300px", width: "500px" })
        }
    }, [])

    return (
        <>
            <div style={{ background: "#212121", minHeight: "80vh" }}>
                <Tennisgame playerX={10} playerWidth={10} playerHeight={90} ballRaidus={20} canvasHeight={canvasDimentions.height} canvasWidth={canvasDimentions.width} setRecord={setRecord} />
            </div>
        </>
    )
}
