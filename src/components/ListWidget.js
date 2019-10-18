import React from 'react'
import Dropdown from "react-dropdown-select";
import '../CSS/widgetList.css'
import 'react-dropdown/style.css'
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
const orderOptions = [{ label: "Ordered", value: true },
    { label: "Unordered", value: false },]

const ListWidget = ({widget, deleteWidget, updateWidget, preview, moveUp, moveDown, isFirst, isLast}) => {
    if (!preview){
        return ( <div className="container widget-container">
            <div className="navbar">
                <div className="nav-header"><h2> List widget </h2></div>
                <div className="form-inline float-right">
                    <button style={isFirst ? {display: 'none'}: {}}
                        onClick={() => moveUp(widget.id)}
                    ><TiArrowUpThick class="delete-btn" size={28}/></button>
                    <button style={isLast ? {display: 'none'}: {}}
                        onClick={() => moveDown(widget.id)}
                    ><TiArrowDownThick class="delete-btn" size={28}/></button>
                    <Dropdown className="widget-dropdown" options={widgetOptions}
                              onChange={(e) =>
                                  updateWidget(widget.id,
                                      {
                                          "type": e[0].value,
                                          "index": widget.index,
                                          "link_title": widget.link_title,
                                          "heading_size": widget.heading_size,
                                          "heading_data": widget.heading_data,
                                          "list_data": widget.list_data,
                                          "paragraph_data": widget.paragraph_data,
                                          "image_url": widget.image_url,
                                          "link_data": widget.link_data,
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
                    value={widget.list_data}
                    placeholder={widget.list_data === "" ? "List items separated by comma": widget.list_data}
                    onChange={(e) =>
                        updateWidget(widget.id,
                            {
                                "type": widget.type,
                                "index": widget.index,
                                "link_title": widget.link_title,
                                "heading_size": widget.heading_size,
                                "heading_data": widget.heading_data,
                                "list_data": e.target.value,
                                "paragraph_data": widget.paragraph_data,
                                "image_url": widget.image_url,
                                "link_data": widget.link_data,
                                "id": widget.id
                            })}
                    className="form-control"/>
            </div>
            <div className="widget-component-element">
                <Dropdown
                    options={orderOptions}
                    placeholder={widget.ordered ? "Ordered": "Unordered"}
                    onChange={(e) =>
                        updateWidget(widget.id,
                            {
                                "type": widget.type,
                                "index": widget.index,
                                "link_title": widget.link_title,
                                "heading_size": widget.heading_size,
                                "heading_data": widget.heading_data,
                                "list_data": widget.list_data,
                                "paragraph_data": widget.paragraph_data,
                                "image_url": widget.image_url,
                                "ordered": !widget.ordered,
                                "link_data": widget.link_data,
                                "id": widget.id
                            })}/>

            </div>
            <div className="widget-component-element">
                <input
                    placeholder="Widget name" className="form-control"/>
            </div>
            <div className="widget-component-element">
                <div>
                    <h3> Preview </h3>
                    {!widget.ordered &&
                    <ul>
                        {
                            widget.list_data.split(',').map(item =>
                                <li>{item}</li>
                            )
                        }
                    </ul>
                    }
                    {widget.ordered &&
                    <ol>
                        {
                            widget.list_data.split(',').map(item =>
                                <li>{item}</li>
                            )
                        }
                    </ol>
                    }
                </div>
            </div>
        </div>)
    } else {
        return (<div>
            {!widget.ordered &&
            <ul>
                {
                    widget.list_data.split(',').map(item =>
                        <li>{item}</li>
                    )
                }
            </ul>
            }
            {widget.ordered &&
            <ol>
                {
                    widget.list_data.split(',').map(item =>
                        <li>{item}</li>
                    )
                }
            </ol>
            }
        </div>)
    }
}


export default ListWidget