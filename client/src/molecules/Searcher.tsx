import "./Searcher.scss"
import { useState } from "react";
import { useSelector } from "react-redux";
import InputText from "../atoms/forms/InputText";
import MiniCard from "../atoms/MiniCard"

//Extending the basic type of object
type IItem = object & {
    _id?: string
    languages?: Array<any>
}

function Searcher (props: { items: IItem[], title: string }) {

    const [query, setQuery] = useState<string>("");
    const lang = useSelector((data: any) => { return data.language.language })
    const items: IItem[] = props.items;
    const onSubmit = (event: { preventDefault: () => void; }) => { event.preventDefault() }
    
    //Filtering items, returning whole list if no query is provided
    const fItems = (i: IItem[], q: string) => {
        if (!q) return i ; 

        return items.filter((item: IItem) => {
            const itemName = item.languages![0][lang].name;
            return itemName.includes(query);
        });
    }

    const filteredItems = fItems(items, query);

    return (
        <div className="searcher">
            <h2 className="searcher__title">{ props.title }</h2>
            {/*SEARCH INPUT*/}
            <form onSubmit={ onSubmit }>
                <InputText 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setQuery(e.target.value) }}
                    htmlFor="Search"  
                    type="text" 
                    name="searchSubjects"
                    value={ query }
                    useSmall={ true }
                    >
                </InputText>
            </form>

                {/*ITEMS LIST*/}
                { filteredItems.map((item: IItem) => (
                    <div key={item._id}>
                        <MiniCard name={ item.languages![0][lang].name } actions="A" />
                    </div>
                  ))
                }                
        </div>
    )
}

export default Searcher;
