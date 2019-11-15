import React from 'react'
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
import ListWidget from "./ListWidget";
import ImageWidget from "./ImageWidget";
import LinkWidget from "./LinkWidget";
import '../CSS/widgetList.css'
import {FaPlusCircle} from 'react-icons/fa';
import Switch from "react-switch";


class WidgetListComponent extends React.Component {

    constructor(props) {
        super(props)
        this.props.loadWidgets(this.props.topicId);
    }


    // let header;
    // if (preview) {
    //     header = "Preview"
    // } else {
    //     header = "Widget List"
    // }

    topicChanged (topicId){
        this.props.loadWidgets(topicId)
    }

    render() {
        if (this.props.topicId){
            if (this.props.widgets.length > 0) {
                return (<div>
                    <div className="navbar">
                        <div className="nav-header"><h2>{this.props.preview ? "Preview" : "Widget List"}</h2></div>
                        <div className="form-inline float-right">
                            <div>
                                <h5 style={{'margin-right': 10}}> Preview </h5>
                            </div>
                            <div>
                                <Switch onChange={this.props.switchPreview} checked={this.props.preview}/>
                            </div>
                            <button className="btn-primary"
                                    onClick={() => this.props.saveAllWidgets(this.props.topicId, this.props.widgets)}
                                    style={{'margin-left': 10, 'margin-bottom': 7, 'background-color': 'green'}}> Save
                            </button>
                        </div>
                    </div>
                    <div className="container">


                        {

                            this.props.widgets.map(widget => {
                                let isFirst = this.props.widgets.indexOf(this.props.widgets
                                    .find(widget1 => widget1.id === widget.id)) === 0;
                                let isLast = this.props.widgets.indexOf(this.props.widgets
                                    .find(widget1 => widget1.id === widget.id)) === (this.props.widgets.length - 1);
                                return (

                                    <div>
                                        {widget.type === "LIST" && <ListWidget widget={widget}
                                                                               deleteWidget={this.props.deleteWidget}
                                                                               updateWidget={this.props.updateWidget}
                                                                               preview={this.props.preview}
                                                                               moveUp={this.props.moveUp}
                                                                               moveDown={this.props.moveDown}
                                                                               isFirst={isFirst}
                                                                               isLast={isLast}
                                                                               topicId={this.props.topicId}/>}
                                        {widget.type === "HEADING" && <HeadingWidget widget={widget}
                                                                                     deleteWidget={this.props.deleteWidget}
                                                                                     updateWidget={this.props.updateWidget}
                                                                                     preview={this.props.preview}
                                                                                     moveUp={this.props.moveUp}
                                                                                     moveDown={this.props.moveDown}
                                                                                     isFirst={isFirst}
                                                                                     isLast={isLast}
                                                                                     topicId={this.props.topicId}/>}
                                        {widget.type === "PARAGRAPH" && <ParagraphWidget widget={widget}
                                                                                         deleteWidget={this.props.deleteWidget}
                                                                                         updateWidget={this.props.updateWidget}
                                                                                         preview={this.props.preview}
                                                                                         moveUp={this.props.moveUp}
                                                                                         moveDown={this.props.moveDown}
                                                                                         isFirst={isFirst}
                                                                                         isLast={isLast}
                                                                                         topicId={this.props.topicId}/>}
                                        {widget.type === "IMAGE" && <ImageWidget widget={widget}
                                                                                 deleteWidget={this.props.deleteWidget}
                                                                                 updateWidget={this.props.updateWidget}
                                                                                 preview={this.props.preview}
                                                                                 moveUp={this.props.moveUp}
                                                                                 moveDown={this.props.moveDown}
                                                                                 isFirst={isFirst}
                                                                                 isLast={isLast}
                                                                                 topicId={this.props.topicId}/>}
                                        {widget.type === "LINK" && <LinkWidget widget={widget}
                                                                               deleteWidget={this.props.deleteWidget}
                                                                               updateWidget={this.props.updateWidget}
                                                                               preview={this.props.preview}
                                                                               moveUp={this.props.moveUp}
                                                                               moveDown={this.props.moveDown}
                                                                               isFirst={isFirst}
                                                                               isLast={isLast}
                                                                               topicId={this.props.topicId}/>}
                                    </div>
                                )
                            })

                        }

                        <button className="add-btn float-right"
                                onClick={() => this.props.addWidget(this.props.topicId)}
                        ><FaPlusCircle className="add-btn" size={40}/></button>

                    </div>
                </div>)
            } else return (
                <div>
                    <h2>Widget list</h2>
                    <button className="add-btn float-right"
                            onClick={() => this.props.addWidget(this.props.topicId)}
                    ><FaPlusCircle className="add-btn" size={40}/></button>
                </div>

            )
        } else return null


    }

}


export default WidgetListComponent;