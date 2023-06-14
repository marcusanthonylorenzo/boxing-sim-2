import React from 'react'
import { Boxer } from '../../constants/BoxerModel'

interface BoxerAttributesT {
    data: Boxer
}

const BoxerAttributesDrawer = ({
    data
}: BoxerAttributesT) => {

    const componentId = `BoxerAttributesDrawer-${data.id}`

    return (
        <div id={componentId}>BoxerAttributesDrawer</div>
    )
}

export default BoxerAttributesDrawer