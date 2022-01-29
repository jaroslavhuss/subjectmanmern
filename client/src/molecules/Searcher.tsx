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

function Searcher (props: { items: IItem[], title: string, dropDownContent: any, setIDCallback: (arg0: any) => void }) {

    const [query, setQuery] = useState<string>("");
    const lang = useSelector((data: any) => { return data.language.language })
    const items: IItem[] = props.items;
    const onSubmit = (event: { preventDefault: () => void; }) => { event.preventDefault() }

   const onTrigger = (event: string | undefined) => {
        props.setIDCallback(event);
    }
    
    //Filtering items, returning whole list if no query is provided
    const fItems = (i: IItem[], q: string) => {
        if (!q) return i ; 

        return items.filter((item: IItem) => {
           const itemName = item.languages![0][lang].name;
           const patern = new RegExp(query, "gi") 
           return itemName.match(patern) 
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
                    type="text" 
                    value={ query }
                    useSmall={ true }
                    >
                </InputText>
            </form>

                {/*ITEMS LIST*/}
                { filteredItems.map((item: IItem) => (
                    <div id={ item._id } key={item._id} onClick={() => onTrigger(item._id)}>
                        <MiniCard name={ item.languages![0][lang].name } dropDownContent={ props.dropDownContent } />
                    </div>
                  ))
                }                
        </div>
    )
}

export default Searcher;
