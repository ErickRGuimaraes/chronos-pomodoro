import './styles/theme.css';
import './styles/global.css';
import { Container } from './components/Container';
import { Menu } from './components/Menu';
import { Logo } from './components/Logo';

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>
    </>
  );
}
