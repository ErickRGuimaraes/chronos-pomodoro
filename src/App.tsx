import './styles/theme.css';
import './styles/global.css';
import { Container } from './components/Container';
import { Menu } from './components/Menu';
import { Logo } from './components/Logo';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';
import { DefaultButton } from './components/DefaultButton';
import { PlayCircleIcon } from 'lucide-react';

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <Container>
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
            <p>Choose a time for your task </p>
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
      </Container>
    </>
  );
}
