import React from 'react'
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
import ListWidget from "./ListWidget";

const WidgetListComponent = ({widgets, addWidget, deleteWidget, updateWidget}) =>
    <div>
        <h2>Widget list</h2>
        <button onClick={addWidget}>Add Widget</button>
        <div>
            {
                widgets.map(widget =>
                    <div>
                        {widget.type === "LIST" && <ListWidget widget={widget}
                                                               deleteWidget={deleteWidget}
                                                               updateWidget={updateWidget}/>}
                        {widget.type === "HEADING" && <HeadingWidget widget={widget}
                                                                     deleteWidget={deleteWidget}
                                                                     updateWidget={updateWidget}/>}
                        {widget.type === "PARAGRAPH" && <ParagraphWidget widget={widget}/>}
                    </div>
                )
            }
        </div>
    </div>

export default WidgetListComponent;