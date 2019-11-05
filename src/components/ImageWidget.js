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

const ImageWidget = ({widget, deleteWidget, updateWidget, preview, moveUp, moveDown, isFirst, isLast, topicId}) => {
    if (!preview) {
        return(<div className="container widget-container">
            <div className="navbar">
                <div className="nav-header"><h2> Image widget </h2></div>
                <div className="form-inline float-right">
                    <button style={isFirst ? {display: 'none'}: {}}
                        onClick={() => moveUp(topicId, widget.id)}
                    ><TiArrowUpThick class="delete-btn" size={28}/></button>
                    <button style={isLast ? {display: 'none'}: {}}
                        onClick={() => moveDown(topicId, widget.id)}
                    ><TiArrowDownThick class="delete-btn" size={28}/></button>
                    <Dropdown className="widget-dropdown" options={widgetOptions}
                              onChange={(e) =>
                                  updateWidget(topicId, widget.id,
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
                            onClick={() => deleteWidget(topicId, widget.id)}
                    ><FaTimes class="delete-btn" size={28}/></button>

                </div>
            </div>

            <div className="widget-component-element">
                <input
                    value={widget.image_url}
                    placeholder={widget.image_url === "" ? "Image URL" : widget.image_url}
                    onChange={(e) =>
                        updateWidget(topicId, widget.id,
                            {
                                "type": widget.type,
                                "index": widget.index,
                                "link_title": widget.link_title,
                                "heading_size": widget.heading_size,
                                "heading_data": widget.heading_data,
                                "list_data": widget.list_data,
                                "paragraph_data": widget.paragraph_data,
                                "image_url": e.target.value,
                                "link_data": widget.link_data,
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
                     src={widget.image_url}/>
            </div>
        </div>)
    } else{
        return(<div>
            <img className="img-fluid "
                 src={widget.image_url}/>
        </div>)
    }
}




export default ImageWidget