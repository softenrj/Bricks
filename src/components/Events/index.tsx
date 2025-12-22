// Copyright (c) 2025 Raj 
// Licensed under the Business Source License 1.1 (BUSL-1.1)
// See LICENSE for details.

"use client"
import { useEvent } from '@/service/api.event'
import { IEvent } from '@/types/event'
import React from 'react'
import FeatureEvent from './FeatureEvent'
import Events from './Events'
import InfiniteScroll from 'react-infinite-scroll-component'

function EventsPage() {
    const [featured, setFeatured] = React.useState<IEvent | null>(null)

    const {
        data,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
    } = useEvent('asc')

    const allEvents = React.useMemo<IEvent[]>(() => {
        if (!data) return []
        return data.pages.flatMap(page => page?.data ?? [])
    }, [data])

    // Set featured event ONCE
    React.useEffect(() => {
        if (!featured && allEvents.length > 0) {
            setFeatured(allEvents[0])
        }
    }, [allEvents, featured])

    return (
        <div className="flex flex-col gap-6 px-4 md:px-6 lg:px-10 max-w-[1600px] mx-auto">

            {featured && <FeatureEvent event={featured} />}

            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-200">
                All Events
            </h2>

            <div
                id="scrollableDiv"
                className="h-[calc(100vh-100px)] overflow-auto hide-scrollbar"
            >
                <InfiniteScroll
                    dataLength={allEvents.length}
                    next={fetchNextPage}
                    hasMore={!!hasNextPage}
                    scrollableTarget="scrollableDiv"
                    loader={
                        <div className="py-6 text-center text-zinc-400">
                            Loading more events…
                        </div>
                    }
                    endMessage={
                        <p className="py-6 text-center text-zinc-500 text-sm">
                            You’ve reached the end ✨
                        </p>
                    }
                >
                    <Events events={allEvents} />
                </InfiniteScroll>
            </div>


            {isLoading && (
                <div className="py-10 text-center text-zinc-400">
                    Loading events…
                </div>
            )}
        </div>
    )
}

export default EventsPage