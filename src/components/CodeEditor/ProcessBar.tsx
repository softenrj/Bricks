// Copyright (c) 2025 Raj 
// See LICENSE for details.
import React from 'react';
import { getSocket } from '@/socket/socket';
import { ProcessSocketType } from '@/types/processSocket';
import { IO_BRICKS_PROCESS_STATUS } from '@/utils/api/socket.events';
import { Tooltip } from '../common/Tooltip';
import { Activity } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Spinner } from '../ui/spinner';
import { motion, AnimatePresence } from 'framer-motion';

function ProcessBar() {
    const [processRunning, setProcessRunning] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const socket = getSocket();

    React.useEffect((): any => {
        if (!socket) return;

        const handler = (payload: ProcessSocketType) => {
            setProcessRunning(payload.status);

            if (payload.status) {
                setTimeout(() => setMessage(payload.message), 300);
            } else {
                setMessage("");
            }
        };

        socket.on(IO_BRICKS_PROCESS_STATUS, handler);
        return () => socket.off(IO_BRICKS_PROCESS_STATUS, handler);
    }, [socket]);

    return (
        <div className="absolute z-1 bottom-10 right-4 flex items-center">
            <Tooltip content={message || "Idle"}>
                <motion.div
                    initial={{ width: 40 }}
                    animate={{ width: processRunning ? 180 : 48 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <Badge className='w-full flex items-center gap-2 px-3 py-1 bg-black rounded-full text-white overflow-hidden'>
                        <Activity size={16} className="text-green-500" />
                        <AnimatePresence>
                            {processRunning && (
                                <>
                                    <Spinner className='w-4 h-4 text-pink-400' />
                                    <motion.p
                                        className='truncate text-sm'
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {message}
                                    </motion.p>
                                </>
                            )}
                        </AnimatePresence>
                    </Badge>
                </motion.div>
            </Tooltip>
        </div>
    );
}

export default ProcessBar;
