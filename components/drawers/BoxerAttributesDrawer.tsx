import React from 'react'
import { Boxer } from '../../constants/BoxerModel'
import { motion, AnimatePresence } from 'framer-motion'

interface BoxerAttributesT {
    data: Boxer,
    onClick?: () => void
}

const BoxerAttributesDrawer = ({
    data, onClick
}: BoxerAttributesT) => {

    const componentId = `BoxerAttributesDrawer-${data.id}`
    const getKeys = Object.keys(data)
    const getValues = Object.values(data)
    // console.log(getKeys, getValues)

    return (
        <AnimatePresence>
            <motion.div id={componentId}
                className={`absolute left-1 px-2`}
                initial={{ opacity: 0.7, x: -30 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.20 }}}
                exit={{ opacity: 0, x: -100 }}
            >
                    <div id={`${componentId}-contentDiv`} onClick={() => onClick ? onClick() : null}>
                        <div id={`${componentId}-contentDiv-attributes`}
                            className={`grid grid-cols-2 grid-rows-${getKeys.length}`}>

                            { getKeys.map((eachKey: string, idx: number) => {
                                    return (<>
                                        {
                                            idx > 12 && idx < getKeys.length - 3 ?

                                            <span className={`text-[13px] text-[#112131] leading-[122%] font-semibold row-span-${idx+1}
                                            ${idx < getKeys.length ? `col-span-1` : `col-span-2` }`}>
                                                {eachKey} : { getValues[idx] }
                                            </span>

                                            : null
                            
                                        }</>)
                                })
                            }
                        </div>
                    </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default BoxerAttributesDrawer