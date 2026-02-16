import React from 'react'
import { useParams,Link } from 'react-router-dom';
import { loadData } from '../utils/localStorage';

const NoteDetail = () => {
  const {id} = useParams();
  const notes = loadData("notes",[]);
  const note = notes.find(n=>n.id === parseInt(id));

  if(!note) return <p>Note not Found</p>
  return (
   <div className='p-6'>
         <Link to="/notes" className="text-blue-500 hover:underline">
        &larr; Back to Notes
      </Link>
    <h1 className='text-3xl fond-semibold my-4'>{note.title}</h1>
    <p>{note.content}</p>
    <div className='mt-2 text-gray-800'>
      Category :{note.category} | Created At: {note.createdAt}
    </div>
   </div>
  )
}

export default NoteDetail