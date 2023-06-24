import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import useNextRouter from '../../hooks/useNextRouter'

interface ProgressDayButtonT {
    parentState: {
        day: number | null,
        setDay: React.Dispatch<React.SetStateAction<number | null>>
    },
    styles: string
}

const ProgressDayButton = ({
    parentState, styles
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
        <div id={`${componentId}-main`} className={``}>
            <button id={`${componentId}-button`}
                className={`bg-zinc-400 font-semibold text-white p-3 rounded-md shadow-md ${styles}`}
                onClick={() => {
                    console.log(componentId + `clickeroo`)
                    progressDayMutation.mutateAsync(day);
                }}
            >
                <h3>Day {day}</h3> 
            </button>
        </div>
    )
}

export default ProgressDayButton