"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaCheck } from "react-icons/fa6"
import { IoCopy } from "react-icons/io5"
import { MdEditSquare } from "react-icons/md"

export const ColorCard = ({ id, content }) => {
  const router = useRouter()
  const [onEdit, setOnEdit] = useState(false)
  const [currentContent, setCurrentContent] = useState(content)
  const [copyText, setCopyText] = useState("")

  async function handleDelete() {
    await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
      {
        method: "DELETE",
      }
    )
    router.refresh()
  }

  async function handleUpdate() {
    const res = await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: currentContent }),
      }
    )
    const data = await res.json()
    setOnEdit(false)
    router.refresh()
  }

  return (
    <div className="bg-zinc-800">
      <div className="py-2 px-2 flex justify-between">
        {onEdit ? (
          <button onClick={handleUpdate}>
            <FaCheck
              color="green"
              size={18}
              className="hover:cursor-pointer hover:scale-125 duration-200"
            />
          </button>
        ) : (
          <button onClick={() => setOnEdit(true)}>
            <MdEditSquare
              color="white"
              size={18}
              className="hover:cursor-pointer hover:scale-125 duration-200"
            />
          </button>
        )}
        <button onClick={handleDelete}>
          <FaRegTrashAlt
            color="red"
            size={18}
            className="hover:cursor-pointer hover:scale-125 duration-200"
          />
        </button>
      </div>

      <div
        key={id}
        className="w-full h-48"
        style={{ backgroundColor: `${currentContent}` }}
      >
        {onEdit ? (
          <input
            style={{ backgroundColor: `${currentContent}` }}
            className="text-zinc-800 text-sm flex justify-center items-center gap-1 w-full h-full text-center border-2 border-green-500"
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
          />
        ) : (
          <CopyToClipboard text={content} onCopy={() => setCopyText(content)}>
            <button className="w-full h-full">
              {copyText === content ? (
                <p className="text-white hover:text-zinc-300">Copied</p>
              ) : (
                <div className="text-white hover:text-zinc-800 text-sm flex justify-center items-center gap-1">
                  {content} <IoCopy color="white" />
                </div>
              )}
            </button>
          </CopyToClipboard>
        )}
      </div>
    </div>
  )
}
