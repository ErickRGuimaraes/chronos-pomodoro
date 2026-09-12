import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();
  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDesriptionMap = {
    workTime: 'Focus cycle',
    shortBreakTime: 'Short break cycle',
    longBreakTime: 'Long break cycle',
  };
  return (
    <div className={styles.cycles}>
      <span>Cycles:</span>
      <div className={styles.cyclesDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);

          return (
            <span
              key={nextCycle}
              className={`${styles.cyclesDot} ${styles[nextCycleType]}`}
              aria-label={`Cycle indicator ${cycleDesriptionMap[nextCycleType]}`}
              title={`Cycle indicator ${cycleDesriptionMap[nextCycleType]}`}
            ></span>
          );
        })}
        {/* <span className={`${styles.cyclesDot} ${styles.workTime}`}></span> */}
      </div>
    </div>
  );
}
