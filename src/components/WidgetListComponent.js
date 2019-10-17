import React from 'react'
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
import ListWidget from "./ListWidget";
import ImageWidget from "./ImageWidget";
import LinkWidget from "./LinkWidget";
import '../CSS/widgetList.css'
import {FaPlusCircle} from 'react-icons/fa';
import Switch from "react-switch";

const WidgetListComponent = ({widgets, preview, addWidget, deleteWidget, updateWidget, switchPreview}) => {
    let header;
    if (preview) {
        header = "Preview"
    } else {
        header = "Widget List"
    }

    if (widgets.length > 0) {
        return (<div>
            <div className="navbar">
                <div className="nav-header"><h2>{header}</h2></div>
                <div className="form-inline float-right">
                    <div>
                        <h5 style={{'margin-right': 10}}> Preview </h5>
                    </div>
                    <div>
                        <Switch onChange={switchPreview} checked={preview}/>
                    </div>
                    <button className="btn-primary"
                            style={{'margin-left': 10, 'margin-bottom': 7, 'background-color': 'green'}}> Save
                    </button>
                </div>
            </div>
            <div className="container">


                {
                    widgets.map(widget =>
                        <div>
                            {widget.type === "LIST" && <ListWidget widget={widget}
                                                                   deleteWidget={deleteWidget}
                                                                   updateWidget={updateWidget}
                                                                   preview={preview}/>}
                            {widget.type === "HEADING" && <HeadingWidget widget={widget}
                                                                         deleteWidget={deleteWidget}
                                                                         updateWidget={updateWidget}
                                                                         preview={preview}/>}
                            {widget.type === "PARAGRAPH" && <ParagraphWidget widget={widget}
                                                                             deleteWidget={deleteWidget}
                                                                             updateWidget={updateWidget}
                                                                             preview={preview}/>}
                            {widget.type === "IMAGE" && <ImageWidget widget={widget}
                                                                     deleteWidget={deleteWidget}
                                                                     updateWidget={updateWidget}
                                                                     preview={preview}/>}
                            {widget.type === "LINK" && <LinkWidget widget={widget}
                                                                   deleteWidget={deleteWidget}
                                                                   updateWidget={updateWidget}
                                                                   preview={preview}/>}
                        </div>
                    )
                }
                <button className="add-btn float-right"
                        onClick={addWidget}
                ><FaPlusCircle className="add-btn" size={40}/></button>

            </div>
        </div>)
    } else return (
        <div>
            <h2>Widget list</h2>
            <button className="add-btn float-right"
                    onClick={addWidget}
            ><FaPlusCircle className="add-btn" size={40}/></button>
        </div>

    )
}


export default WidgetListComponent;