"use client"
import { CATEGORY_COLORS } from '@/constants/CATEGORY_COLORS'
const generateRandom = (): number => {
    return Math.floor(Math.random() * 10)
}

const WorkServices = ({ service }: { service: {title?: string}}) => {


    return (
        <span
            className={`px-3 py-2 bg-gray-900 text-lg uppercase font-semibold rounded-full border-2 hover:bg-white/10 ${CATEGORY_COLORS[generateRandom()]} transition whitespace-nowrap`}
        >
            {service.title}
        </span>
    )
}

export default WorkServices