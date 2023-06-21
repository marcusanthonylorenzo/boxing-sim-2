import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'

interface ProgressDayButtonT {
    parentState: {
        day: number | null
    }
}

const ProgressDayButton = ({
    parentState
}: ProgressDayButtonT) => {
    const componentId = "ProgressDay";
    const { day } = parentState;

    console.log(day)

    const progressDayMutation = useMutation({
        mutationFn: async (day: number | null) => {
            try {
                const { data } = await axios.post(`/api/calendar`, {
                        day: day      
                });
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