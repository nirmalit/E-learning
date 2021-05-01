import React from 'react'

const Base = ({title="Your Title" ,description="your description"}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="shadow mb-3 bg-white rounded-pill text-center">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Base
