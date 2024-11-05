import React from 'react'
import { Link } from 'react-router-dom';
import Loading from "./Loading.js"

export default function NotesTable({ userNotes, viewNote, deleteNote }) {
    return (
        // skkahier
        <>
            <div className="flex justify-center items-center my-5" style={{ minHeight: "80.85vh" }} >
                <div className="w-4/5 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {userNotes ? userNotes.map((note, index) => {
                                return <li className="py-3 sm:py-4" key={index}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {note.topic}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {note.content}
                                                {/* {note.content.slice(0, 35)}... */}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            <Link to="/auth/viewnotes">
                                                <button onClick={() => viewNote(index)} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                                    View
                                                </button>
                                            </Link>
                                            <button onClick={() => deleteNote(index)} className="deleteBtn focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "30px", height: "25px" }}
                                                ></lord-icon>
                                            </button>

                                        </div>
                                    </div>
                                </li>
                            }) : <Loading />}
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Edit New
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <Link to="/auth/editnotes">
                                            <button className=" focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                                +
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}
