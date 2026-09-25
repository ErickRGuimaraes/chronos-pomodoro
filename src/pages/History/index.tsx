import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { DefaultButton } from '../../components/DefaultButton';
import {
  ArrowDownIcon,
  ArrowDownUpIcon,
  ArrowUpIcon,
  TrashIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { useEffect, useMemo, useState } from 'react';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function History() {
  const { state, dispatch } = useTaskContext();

  const hasTasks = state.tasks.length > 0;

  const [sortTaskOptions, setSortTaskOptions] = useState<
    Pick<SortTasksOptions, 'field' | 'direction'>
  >({
    field: 'startDate',
    direction: 'desc',
  });

  const sortedTasks = useMemo(() => {
    return sortTasks({
      tasks: state.tasks,
      field: sortTaskOptions.field,
      direction: sortTaskOptions.direction,
    });
  }, [state.tasks, sortTaskOptions]);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    setSortTaskOptions(prevState => ({
      field,
      direction: prevState.direction === 'desc' ? 'asc' : 'desc',
    }));
  }

  function handleResetHistory() {
    showMessage.dismiss();

    showMessage.confirm('Tem certeza?', confirmation => {
      if (!confirmation) return;

      dispatch({
        type: TaskActionTypes.RESET_STATE,
      });
    });
  }

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  function renderSortIcon(field: SortTasksOptions['field']) {
    if (sortTaskOptions.field !== field) {
      return <ArrowDownUpIcon size={14} />;
    }

    if (sortTaskOptions.direction === 'asc') {
      return <ArrowDownIcon size={14} />;
    }

    return <ArrowUpIcon size={14} />;
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>

          <span className={styles.buttonContainer}>
            {hasTasks && (
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleResetHistory}
              />
            )}
          </span>
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa {renderSortIcon('name')}
                  </th>

                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duração {renderSortIcon('duration')}
                  </th>

                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Data {renderSortIcon('startDate')}
                  </th>

                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortedTasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso Curto',
                    longBreakTime: 'Descanso Longo',
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p style={{ textAlign: 'center' }}>Ainda não tem tarefas criadas.</p>
        )}
      </Container>
    </MainTemplate>
  );
}
