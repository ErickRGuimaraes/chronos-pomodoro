import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import React, { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();

  const taskNameInput = useRef<HTMLInputElement | null>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Please enter a task name.');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.sucesess('Task iniciada com sucesso!');
  }

  function handleInterruptTask(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    showMessage.dismiss();
    showMessage.info('Tarefa interrompida');
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='form-row'>
        <DefaultInput
          id='myInput'
          type='text'
          labelText='Task:'
          placeholder='Enter a task to be done'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className='form-row'>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className='form-row'>
          <Cycles />
        </div>
      )}

      <div className='form-row'>
        {!state.activeTask && (
          <DefaultButton
            aria-label='Start task button'
            title='Start task button'
            type='submit'
            icon={<PlayCircleIcon />}
            color='green'
            key='start-task-button'
          />
        )}
        {!!state.activeTask && (
          <DefaultButton
            aria-label='Task in progress button'
            title='Task in progress button'
            type='button'
            icon={<StopCircleIcon />}
            color='red'
            key='interrupt-task-button'
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
