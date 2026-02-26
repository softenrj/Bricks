// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client"
import { useEvent, useLikeEvent } from '@/service/api.event'
import { IEvent } from '@/types/event'
import React from 'react'
import FeatureEvent from './FeatureEvent'
import Events from './Events'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch } from '@/hooks/redux'
import { setLyrics } from '@/store/Reducers/effects'
import LyricPortal from './LyricPortal'

function EventsPage() {
    const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
    const dispatch = useAppDispatch()

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

    const featuredEvent = React.useMemo<IEvent | undefined>(() => {
        if (!allEvents.length) return undefined;

        if (selectedEventId) {
            return allEvents.find(e => e._id === selectedEventId) || allEvents[0];
        }

        return allEvents[0];
    }, [allEvents, selectedEventId]);

    const likeMutation = useLikeEvent();

    const handleEventChange = (eventId: string) => setSelectedEventId(eventId);
    const incLikeToEvent = (eventId: string) => likeMutation.mutate({ eventId: eventId, isLiked: false });
    const decLikeToEvent = (eventId: string) => likeMutation.mutate({ eventId: eventId, isLiked: true });

    React.useEffect(() => {
        if (!featuredEvent) return;

        dispatch(setLyrics(featuredEvent.lyrics ?? []));
    }, [featuredEvent, dispatch]);

    return (
        <>
            <div className="flex flex-col gap-6 py-4 px-4 md:px-6 lg:px-10 max-w-[1600px] mx-auto">

                {featuredEvent && <FeatureEvent event={featuredEvent} incLikeToEvent={incLikeToEvent} decLikeToEvent={decLikeToEvent} />}

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
                        <Events events={allEvents} eventFallback={handleEventChange} />
                    </InfiniteScroll>
                </div>


                {isLoading && (
                    <div className="py-10 text-center text-zinc-400">
                        Loading events…
                    </div>
                )}
            </div>

            <LyricPortal />
        </>
    )
}

export default EventsPage