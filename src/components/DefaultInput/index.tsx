import style from './styles.module.css';

type DefaultInputProps = React.ComponentProps<'input'> & {
  id: string;
  labelText: string;
};

export function DefaultInput({
  type,
  id,
  labelText,
  ...rest
}: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input className={style.input} type={type} id={id} {...rest} />
    </>
  );
}
