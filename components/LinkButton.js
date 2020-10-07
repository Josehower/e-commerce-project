import Link from 'next/link';

const LinkButton = (props) => {
  return (
    <Link href={props.href}>
      <button onClick={props.handler}>
        {props.text}
        {props.children}
      </button>
    </Link>
  );
};

export default LinkButton;
