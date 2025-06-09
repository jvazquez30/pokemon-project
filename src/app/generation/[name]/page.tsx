import { useParams } from "next/navigation"
import { useState } from "react"


// this will show the generation information

export default function GenerationPage() {
    const params = useParams()
    const [info, setinfo] = useState()
return (
    <div>
        Adding Generation info:
            Cities:
            Country:
    </div>

)
}