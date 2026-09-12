import { createContext } from 'react';
import type React from 'react';

import type { TaskStateModel } from '../../models/TaskStateModel';
import type { TaskActionModel } from './taskActions';
import { initialTaskState } from './initialTaskState';

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue: TaskContextProps = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
