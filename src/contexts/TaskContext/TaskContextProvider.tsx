import { useEffect, useReducer, useRef } from 'react';

import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  // Carrega o beep quando uma tarefa começa
  useEffect(() => {
    if (state.activeTask) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  // Controla o Worker do timer
  useEffect(() => {
    if (!state.activeTask) {
      return;
    }

    const worker = TimerWorkerManager.getInstance();

    worker.onmessage(e => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }

        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });

        worker.terminate();
        return;
      }

      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: {
          secondsRemaining: countDownSeconds,
        },
      });
    });

    worker.postMessage(state);

    return () => {
      worker.terminate();
    };
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
