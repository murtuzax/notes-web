import { useEffect, useState } from "react"

function App() {

  const [heading, setHeading] = useState("")
  const [detail, setDetail] = useState("")
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"))
    if(!notes || notes.length===0) return
    setNotes(notes)
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault()
    const newNotesArray = [...notes, { heading: heading, detail: detail }]
    setNotes(newNotesArray)
    localStorage.setItem("notes", JSON.stringify(newNotesArray))
    setDetail("")
    setHeading("")
  }

  const handleDelete = (heading) => {
    const newNotesArray = notes.filter((note) => {
      return note.heading != heading
    })
    setNotes(newNotesArray)
    localStorage.setItem("notes", JSON.stringify(newNotesArray))
  }

  console.log(notes)

  return (
    <>
      <div className='bg-neutral-950 min-h-screen gap-4 p-10 text-white'>
        <h2 className="text-xl font-bold mb-6">Create New Notes</h2>
        <form onSubmit={(e) => handleSubmit(e)} className='flex justify-between flex-col items-start gap-2.5'>
          <input value={heading} onChange={(e) => setHeading(e.target.value)} type="text" placeholder='Enter notes heading' className='py-2 px-5 border rounded-sm border-neutral-500 outline-none' />
          <input value={detail} onChange={(e) => setDetail(e.target.value)} type="text" placeholder='Enter notes detail' className='py-2 px-5 border rounded-sm border-neutral-500 outline-none' />
          <button className="bg-white border-none px-5 py-2 rounded-sm text-neutral-950">Add Note</button>
        </form>

        <div>
          <h2 className="text-xl font-bold my-6">Your Notes</h2>
          <div className="cards flex flex-col md:flex-row justify-start md:items-center mt-5 gap-10">
            {notes.map((note) => {
              return <div className="relative card h-48 w-44 bg-neutral-900 rounded-sm p-4 overflow-clip">
                <h3>{note.heading}</h3>
                <p className="text-neutral-400">{note.detail}</p>
                <div onClick={() => handleDelete(note.heading)} className="absolute top-4 right-4 bg-red-500 p-1 text-xs rounded-md">Del</div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
