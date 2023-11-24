"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export const ColorInput = ({ currentContent }) => {
  const router = useRouter()
  const [color, setColor] = useState("")

  async function createNote() {
    const res = await fetch(
      "https://devscale-mockapi.fly.dev/api/collections/notes/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: color,
          user: "azham@yahoo.com",
          additionalData: "",
        }),
      }
    )
    const data = await res.json()
    console.log(data)
    router.refresh()
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <input
        style={{ backgroundColor: color }}
        onChange={(e) => setColor(e.target.value)}
        className="input"
        placeholder="# Enter hex color"
      />
      <button onClick={createNote} className="button">
        Save Color
      </button>
    </div>
  )
}
