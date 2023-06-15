import React from 'react'
import { Boxer } from '../../constants/BoxerModel'
import { motion, AnimatePresence } from 'framer-motion'

interface BoxerAttributesT {
    data: Boxer
}

const BoxerAttributesDrawer = ({
    data
}: BoxerAttributesT) => {

    const componentId = `BoxerAttributesDrawer-${data.id}`

    return (
        <AnimatePresence>
            <motion.div id={componentId}
                className={`absolute`}
                initial={{ opacity: 0, x: -70 }}
                animate={{ opacity: 1, x: 0}}
                exit={{ opacity: 0, x: -100 }}>
                    BoxerAttributesDrawer
            </motion.div>
        </AnimatePresence>
    )
}

export default BoxerAttributesDrawer