
import { Lang } from "../langauges/Dictionary";
import { useSelector } from "react-redux";

const Translate = ({ translationChunk }: { translationChunk: string }) => {
    const lang = useSelector((data: any) => {
        return data.language.language
    })
    return (
        <span>
            {
                //@ts-ignore
                Lang[translationChunk][lang]
            }
        </span>
    )
}

export default Translate
