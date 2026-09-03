import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';

export function MainForm() {
  return (
    <form className='form' action=''>
      <div className='form-row'>
        <DefaultInput
          id='myInput'
          type='text'
          labelText='Task:'
          placeholder='Enter a task to be done'
        />
      </div>
      <div className='form-row'>
        <p>O tempo para o proximo intervalo e de 25 minutos</p>
      </div>

      <div className='form-row'>
        <Cycles />
      </div>

      <div className='form-row'>
        <p>0 0 0 0 0 0 </p>
      </div>

      <div className='form-row'>
        <DefaultButton icon={<PlayCircleIcon />} color='green' />
      </div>
    </form>
  );
}
