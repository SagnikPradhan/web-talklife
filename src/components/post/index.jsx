import "./style.scss";

export default ({ data }) => {
  let { content, user } = data;

  // Show only part of the content if very huge
  const len = content.length;
  if (len > 700) content = content.slice(0, 700);

  return (
    <>
      <div id="user-info">
        <img
          src={user.avatar}
          alt={user.username + " avatar"}
          loading="lazy"
          height="40px"
          width="40px"
        />
        <span>{user.username}</span>
      </div>

      <div id="content">{content}</div>
    </>
  );
};
