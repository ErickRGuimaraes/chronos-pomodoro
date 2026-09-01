import { Container } from '../../components/Container';
import { MainTemplate } from '../../templates/MainTemplate';
export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <h1>Not Found</h1>
        <p>404 - Page Not Found</p>
      </Container>
    </MainTemplate>
  );
}
