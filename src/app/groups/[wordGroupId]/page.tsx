import React from 'react'
import {cookies} from 'next/headers'


export const revalidate=0


const WordGroupDetailPage = async ({ params }) => {


    const {wordGroupId} = await params

    console.log({wordGroupId})


    const res = await fetch(`${process.env.SERVER_URL}/word-group/${wordGroupId}`, {
        headers: {
            Authorization: `Bearer ${cookies().get('recall-token')?.value}`
        },
        
    })

    const data = await res.json()

    console.log(data)
    return (
        <div>WordGroupDetailPage</div>
    )
}

export default WordGroupDetailPage