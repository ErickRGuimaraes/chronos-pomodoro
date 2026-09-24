import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { DefaultInput } from '../../components/DefaultInput';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveIcon } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function Settings() {
  const workTimeInput = useRef<HTMLInputElement | null>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement | null>(null);
  const longBreakTimeInput = useRef<HTMLInputElement | null>(null);
  const { state, dispatch } = useTaskContext();

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const formErrors = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Digite apenas números em todos os campos');
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push('Digite valor entre 1 e 99 para foco ');
    }

    if (shortBreakTime < 1 || shortBreakTime > 15) {
      formErrors.push('Digite valor entre 1 e 15 para descanso curto ');
    }

    if (longBreakTime < 1 || longBreakTime > 30) {
      formErrors.push('Digite valor entre 1 e 30 para descanso longo ');
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => showMessage.error(error));
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });

    showMessage.success('Configurações salvas.');
  }

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curto e
          descanso longo.
        </p>
      </Container>
      <Container>
        <form onSubmit={handleSaveSettings} action='' className='form'>
          <div className='form-row'>
            <DefaultInput
              id='workTime'
              labelText='Foco'
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type='number'
            ></DefaultInput>
          </div>
          <div className='form-row'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
              type='number'
            ></DefaultInput>
          </div>
          <div className='form-row'>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type='number'
            ></DefaultInput>
          </div>
          <div className='form-row'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar alterações'
              title='Salvar alterações'
            ></DefaultButton>
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
