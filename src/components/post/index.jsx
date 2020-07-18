import "./style.scss"

export default ({ data }) => {
  const { id, content } = data;
  
  return <li key={id}>{content}</li>;
};
