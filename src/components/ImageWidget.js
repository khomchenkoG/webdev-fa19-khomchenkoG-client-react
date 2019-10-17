import React from 'react'
import Dropdown from "react-dropdown-select";
import {FaTimes} from 'react-icons/fa';
import {TiArrowDownThick} from 'react-icons/ti';
import {TiArrowUpThick} from 'react-icons/ti';

const widgetOptions = [
    { label: "Heading", value: "HEADING" },
    { label: "Paragraph", value: "PARAGRAPH" },
    { label: "List", value: "LIST" },
    { label: "Image", value: "IMAGE" },
    { label: "Link", value: "LINK" },
]

const ImageWidget = ({widget, deleteWidget, updateWidget, preview}) => {
    if (!preview) {
        return(<div className="container widget-container">
            <div className="navbar">
                <div className="nav-header"><h2> Image widget </h2></div>
                <div className="form-inline float-right">
                    <button
                        onClick={() => deleteWidget(widget.id)}
                    ><TiArrowUpThick class="delete-btn" size={28}/></button>
                    <button
                        onClick={() => deleteWidget(widget.id)}
                    ><TiArrowDownThick class="delete-btn" size={28}/></button>
                    <Dropdown className="widget-dropdown" options={widgetOptions}
                              onChange={(e) =>
                                  updateWidget(widget.id,
                                      {
                                          "type": e[0].value,
                                          "size": widget.size,
                                          "data": widget.data,
                                          "id": widget.id
                                      }
                                  )} size={17} placeholder={widget.type}/>
                    <button className="btn"
                            onClick={() => deleteWidget(widget.id)}
                    ><FaTimes class="delete-btn" size={28}/></button>

                </div>
            </div>

            <div className="widget-component-element">
                <input
                    value={widget.data}
                    placeholder={widget.data === "" ? "Image URL" : widget.data}
                    onChange={(e) =>
                        updateWidget(widget.id,
                            {
                                "type": widget.type,
                                "size": widget.size,
                                "data": e.target.value,
                                "id": widget.id
                            })}

                    className="form-control"/>
            </div>
            <div className="widget-component-element">
                <input
                    placeholder="Widget name" className="form-control"/>
            </div>
            <div className="widget-component-element">
                <h3>Preview</h3>
                <img className="img-fluid "
                     src={widget.data}/>
            </div>
        </div>)
    } else{
        return(<div>
            <img className="img-fluid "
                 src={widget.data}/>
        </div>)
    }
}




export default ImageWidget