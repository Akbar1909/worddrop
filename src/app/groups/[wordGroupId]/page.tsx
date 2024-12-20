import React from 'react'
import { cookies } from 'next/headers'
import StackedCards from '@/components/StackedCards'
import { returnArray } from '@/utils/common'


export const revalidate = 0


const WordGroupDetailPage = async ({ params }) => {


    const { wordGroupId } = await params




    const res = await fetch(`${process.env.SERVER_URL}/word-group/${wordGroupId}`, {
        headers: {
            Authorization: `Bearer ${cookies().get('recall-token')?.value}`
        },

    })

    const data = await res.json()

    return (
        <StackedCards words={returnArray(data?.wordGroupDefinitions)}>WordGroupDetailPage</StackedCards>
    )
}

export default WordGroupDetailPage