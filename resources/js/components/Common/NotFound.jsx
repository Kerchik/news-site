import React from 'react'
import notFound from '../../img/notFound.png'

const NotFound = () => {
    return (
        <div className="content-width main justify-content-center p-4">
            <img className="not-found-image" src={notFound} />
            <div className="my-auto font-28 ml-2">
                Not found
            </div>
        </div>
    )
}

export default NotFound