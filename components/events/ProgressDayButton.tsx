import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import useNextRouter from '../../hooks/useNextRouter'

interface ProgressDayButtonT {
    parentState: {
        day: number | null,
        setDay: React.Dispatch<React.SetStateAction<number | null>>
    },
    styles: string,
    disabled: boolean
}

const ProgressDayButton = ({
    parentState, styles, disabled
}: ProgressDayButtonT) => {
    const componentId = "ProgressDay";
    const { day, setDay } = parentState;
    const { router, refreshData } = useNextRouter();

    const increaseDay = (newDay: number | null) : number => newDay ? newDay + 1 : 1;

    const progressDayMutation = useMutation({
        mutationFn: async (day: number | null) => {
            const progressDayAction = await increaseDay(day);
            try {
                const { data } = await axios.patch(`/api/calendar`,
                {
                    day: progressDayAction      
                });
                router.reload();
                refreshData();
                return data;
            } catch (error) {
                console.error(error)
            }
        }
      })


    return (
        <div id={`${componentId}-main`} className={`ml-6`}>
            <button id={`${componentId}-button`}
                className={`bg-orange-600 font-semibold text-white p-3 rounded-md shadow-md ${styles} ${disabled ? `opacity-20` : ``}`}
                onClick={() => {
                    console.log(componentId + `clickeroo`)
                    progressDayMutation.mutateAsync(day);
                }}
                disabled={disabled}>
                {
                    progressDayMutation.isLoading ?
                    (`...Progressing Day.`) :
                            progressDayMutation.isSuccess ?
                            (`...Ending Day`) : 
                            <> <h3>Day:                                 
                                {
                                    progressDayMutation.isError ?
                                    (`An error occurred: ${progressDayMutation.error}`) :
                                    (<>{` ${day} `}</>)
                                }            
                            </h3>
                            </>
                }
            </button>
        </div>
    )
}

export default ProgressDayButton