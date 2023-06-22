import React from 'react'
import { useRouter } from 'next/router'

const useNextRouter = () => {

    const router = useRouter();
    const refreshData = () => router.replace(router.asPath);

  return { router, refreshData }
}

export default useNextRouter