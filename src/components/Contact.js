import React, { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function Contact(props) {
  const userEmail = useRef();
  const userQuery = useRef();

  const cleanEnterface = () => {
    userEmail.current.value = ""
    userQuery.current.value = ""
  }
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

  const sendQuery = async (data) => {
    await fetch(`https://onotesbackend-production.up.railway.app/contact/userQuery`, { method: "POST", body: JSON.stringify(data) }).catch(
      console.log('err')
    )
    popTost("Send ✔", true)
    cleanEnterface()
  }
  const handleSend = () => {
    const data = {
      "userEmail": userEmail.current.value,
      "userQuery": userQuery.current.value,
    }
    if (data.userEmail === "" || data.userQuery === "") {
      let warning;
      if (data.userEmail === "") warning = "please fill an email"
      if (data.userQuery === "") warning = "please fill your query"
      popTost(warning, false)
      return -1
    }
    sendQuery(data)
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className='flex maintainHeight ' >
        <img className='hiddenForMobile' src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="" />
        <div className='flex flex-col justify-center m-auto'>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input ref={userEmail} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
          </div>
          <div className='flex flex-col justify-center'>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Queries</label>
            <textarea data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" ref={userQuery} id="message" className="block h-52 w-96 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
          </div>
          <div className='flex my-5 justify-center items-center'>
            <button onClick={() => handleSend()} className="flex justify-center items-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-1 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Send queries
              <lord-icon
                src="https://cdn.lordicon.com/slmechys.json"
                trigger="hover"
                style={{ width: "30px", height: "25px" }}
              ></lord-icon>
            </button>
          </div>
        </div>
      </div >
    </>

  )
}
