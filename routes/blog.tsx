import { PageProps } from '$fresh/server.ts';

export default function Blog(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}
