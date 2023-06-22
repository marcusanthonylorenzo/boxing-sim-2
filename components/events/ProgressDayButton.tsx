import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import useNextRouter from '../../hooks/useNextRouter'

interface ProgressDayButtonT {
    parentState: {
        day: number | null,
        setDay: React.Dispatch<React.SetStateAction<number | null>>
    }
}

const ProgressDayButton = ({
    parentState
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
        <div id={`${componentId}-main`}>
            <button id={`${componentId}-button`}
                className={`bg-[#793e33] p-3 rounded-md shadow-sm border-gray-200`}
                onClick={() => {
                    console.log(componentId + `clickeroo`)
                    progressDayMutation.mutateAsync(day);
                }}
            >
                ProgressDayButton
            </button>
        </div>
    )
}

export default ProgressDayButton