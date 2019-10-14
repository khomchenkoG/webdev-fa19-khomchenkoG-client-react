import React from 'react'
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
import ListWidget from "./ListWidget";

const WidgetListComponent = ({widgets, addWidget, deleteWidget}) =>
    <div>
        <h2>Widget list</h2>
        <button onClick={addWidget}>Add Widget</button>
        <ul>
            {
                widgets.map(widget =>
                    <li>
                        { widget.type === "LIST" && <ListWidget widget={widget}/>}
                        { widget.type === "HEADING" && <HeadingWidget widget={widget}/>}
                        { widget.type === "PARAGRAPH" && <ParagraphWidget widget={widget}/>}
                        <button onClick={() => deleteWidget(widget.id)}>Delete</button>
                    </li>
                )
            }
        </ul>
    </div>

export default WidgetListComponent;