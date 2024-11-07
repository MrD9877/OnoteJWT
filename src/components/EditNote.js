import React, { useRef, } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ButtonBar from './ButtonBar.js';


export default function EditNote(props) {

    const contentarea = useRef()
    const topicArea = useRef()
    const popTost = (msg, success) => {
        let emote = "❌";
        if (success) emote = "✅"
        toast(`${msg}`,
            {
                icon: `${emote}`,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    }


    const clearEditor = () => {
        topicArea.current.value = ""
        contentarea.current.value = ""
    }

    const savetoDB = async (data) => {
        try {
            const res = await fetch(`http://localhost:3000/addnotes`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            console.log(res)
            popTost("Article saved", true)
            props.fechUserNotes()
        } catch (err) {
            console.log("fail to fech")
        }
    }

    const handleBtn = (action) => {
        if (action === "copy") {
            const textToPutOnClipboard = contentarea.current.value
            navigator.clipboard.writeText(textToPutOnClipboard)
            popTost("Copied ✔", true)
        }
        if (action === "delete") {
            contentarea.current.value = ""
        }
        if (action === "save") {
            const topic = topicArea.current.value
            const content = contentarea.current.value
            if (topic === "" || content === "") {
                if (content === "") {
                    popTost("Content is empty", false)
                }
                if (topic === "") {
                    popTost("Topic is empty", false)
                }
                return -1
            }
            const data = { "topic": topic, "content": content };
            savetoDB(data)
            clearEditor()
        }
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className='flex mx-auto flex-col my-10 items-center' style={{ minHeight: "70.85vh" }} >
                <div className="mb-6 flex justify-center items-center" >
                    <input ref={topicArea} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Topic' />
                </div>
                <div className="mb-6 w-4/5" >
                    <textarea style={{ minHeight: "50vh" }} data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" ref={contentarea} id="message" rows="4" className=" block p-2.5 h-full w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>
                <ButtonBar handleBtn={handleBtn} />
            </div>
        </>
    )
}
