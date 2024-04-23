import React from 'react'

const page = ({params}:any) => {
  return (
    <div>
        <h1>profile</h1>
        <h1>{params.id}</h1>
    </div>
  )
}

export default page