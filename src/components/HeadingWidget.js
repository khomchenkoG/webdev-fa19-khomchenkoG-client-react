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

const HeadingWidget = ({widget, deleteWidget, updateWidget, preview}) => {
    if (!preview){
        return (
            <div className="container widget-container">
                <div className="navbar">
                    <div className="nav-header"><h2> Heading widget </h2></div>
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

                <div class="widget-component-element">
                    <input
                        value={widget.data}
                        placeholder={widget.data === "" ? "Heading name" : widget.data}
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
                <div class="widget-component-element">
                    <Dropdown options={sizeOptions}
                              onChange={(e) =>
                                  updateWidget(widget.id,
                                      {
                                          "type": widget.type,
                                          "size": e[0].value,
                                          "data": widget.data,
                                          "id": widget.id
                                      })}
                              placeholder={"Heading " + widget.size}/>
                </div>
                <div className="widget-component-element">
                    <input
                        placeholder="Widget name" className="form-control"/>
                </div>
                <div class="widget-component-element">
                    <h3>Preview</h3>
                    {widget.size === 1 && <h1>{widget.data}</h1>}
                    {widget.size === 2 && <h2>{widget.data}</h2>}
                    {widget.size === 3 && <h3>{widget.data}</h3>}
                    {widget.size === 4 && <h4>{widget.data}</h4>}
                    {widget.size === 5 && <h5>{widget.data}</h5>}
                    {widget.size === 6 && <h6>{widget.data}</h6>}
                </div>
            </div>)

    } else return (
        <div >
            {widget.size === 1 && <h1>{widget.data}</h1>}
            {widget.size === 2 && <h2>{widget.data}</h2>}
            {widget.size === 3 && <h3>{widget.data}</h3>}
            {widget.size === 4 && <h4>{widget.data}</h4>}
            {widget.size === 5 && <h5>{widget.data}</h5>}
            {widget.size === 6 && <h6>{widget.data}</h6>}
        </div>
    )

}

export default HeadingWidget