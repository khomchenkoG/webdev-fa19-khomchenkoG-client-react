import React from 'react'

const ListWidget = ({widget}) =>
    <div>
        {!widget.ordered &&
        <ul>
            {
                widget.items.split(',').map(item =>
                    <li>{item}</li>
                )
            }
        </ul>
        }
        {widget.ordered &&
        <ol>
            {
                widget.items.split(',').map(item =>
                    <li>{item}</li>
                )
            }
        </ol>
        }
    </div>

export default ListWidget