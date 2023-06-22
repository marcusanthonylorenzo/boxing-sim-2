import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

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
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
      }

    const increaseDay = (newDay: number | null) : number => newDay ? newDay + 1 : 1;

    const progressDayMutation = useMutation({
        mutationFn: async (day: number | null) => {
            const progressDayAction = await increaseDay(day);
            console.log(`progressDayAction`, day, progressDayAction)
            try {
                const { data } = await axios.patch(`/api/calendar`, {
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
            className={``}
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