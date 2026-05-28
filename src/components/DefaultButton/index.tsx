import style from './styles.module.css';

type DefaultButtonProps = React.ComponentProps<'button'> & {
  icon: React.ReactNode;
  color?: 'green' | 'red';
};

export function DefaultButton({
  icon,
  color = 'green',
  ...props
}: DefaultButtonProps) {
  return (
    <>
      <button className={`${style.button} ${style[color]}`} {...props}>
        {icon}
      </button>
    </>
  );
}
