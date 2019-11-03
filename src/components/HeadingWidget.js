import React from 'react'
import '../CSS/widgetList.css'
import Dropdown from 'react-dropdown-select'
import 'react-dropdown/style.css'
import {FaTimes} from 'react-icons/fa';
import {TiArrowDownThick} from 'react-icons/ti';
import {TiArrowUpThick} from 'react-icons/ti';
import {FaPlusCircle} from 'react-icons/fa';


const widgetOptions = [
    { label: "Heading", value: "HEADING" },
    { label: "Paragraph", value: "PARAGRAPH" },
    { label: "List", value: "LIST" },
    { label: "Image", value: "IMAGE" },
    { label: "Link", value: "LINK" },
]
const sizeOptions = [{ label: "Heading 1", value: 1 },
    { label: "Heading 2", value: 2 },
    { label: "Heading 3", value: 3 },]

const HeadingWidget = ({widget, deleteWidget, updateWidget, preview, moveUp, moveDown, isFirst, isLast, topicId}) => {

    if (!preview){
        return (
            <div className="container widget-container">
                <div className="navbar">
                    <div className="nav-header"><h2> Heading widget </h2></div>
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

                <div class="widget-component-element">
                    <input
                        value={widget.heading_data}
                        placeholder={widget.heading_data === "" ? "Heading name" : widget.heading_data}
                        onChange={(e) =>
                            updateWidget(topicId, widget.id,
                                {
                                    "type": widget.type,
                                    "index": widget.index,
                                    "link_title": widget.link_title,
                                    "heading_size": widget.heading_size,
                                    "heading_data": e.target.value,
                                    "list_data": widget.list_data,
                                    "paragraph_data": widget.paragraph_data,
                                    "image_url": widget.image_url,
                                    "link_data": widget.link_data,
                                    "id": widget.id
                                })}

                        className="form-control"/>
                </div>
                <div class="widget-component-element">
                    <Dropdown options={sizeOptions}
                              onChange={(e) =>
                                  updateWidget(topicId,widget.id,
                                      {
                                          "type": widget.type,
                                          "index": widget.index,
                                          "link_title": widget.link_title,
                                          "heading_size": e[0].value,
                                          "heading_data": widget.heading_data,
                                          "list_data": widget.list_data,
                                          "paragraph_data": widget.paragraph_data,
                                          "image_url": widget.image_url,
                                          "link_data": widget.link_data,
                                          "id": widget.id
                                      })}
                              placeholder={"Heading " + widget.heading_size}/>
                </div>
                <div className="widget-component-element">
                    <input
                        placeholder="Widget name" className="form-control"/>
                </div>
                <div class="widget-component-element">
                    <h3>Preview</h3>
                    {widget.heading_size === 1 && <h1>{widget.heading_data}</h1>}
                    {widget.heading_size === 2 && <h2>{widget.heading_data}</h2>}
                    {widget.heading_size === 3 && <h3>{widget.heading_data}</h3>}
                    {widget.heading_size === 4 && <h4>{widget.heading_data}</h4>}
                    {widget.heading_size === 5 && <h5>{widget.heading_data}</h5>}
                    {widget.heading_size === 6 && <h6>{widget.heading_data}</h6>}
                </div>
            </div>)

    } else return (
        <div >
            {widget.heading_size === 1 && <h1>{widget.heading_data}</h1>}
            {widget.heading_size === 2 && <h2>{widget.heading_data}</h2>}
            {widget.heading_size === 3 && <h3>{widget.heading_data}</h3>}
            {widget.heading_size === 4 && <h4>{widget.heading_data}</h4>}
            {widget.heading_size === 5 && <h5>{widget.heading_data}</h5>}
            {widget.heading_size === 6 && <h6>{widget.heading_data}</h6>}
        </div>
    )

}

export default HeadingWidget