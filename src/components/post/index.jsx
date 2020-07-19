import "./style.scss";

function calcluateSpanLen(textLen) {
  if (textLen >= 600) return 5;
  if (textLen >= 500) return 4;
  if (textLen >= 400) return 4;
  if (textLen >= 300) return 3;
  if (textLen >= 200) return 3;
  if (textLen >= 180) return 3;
  return 2;
}

export default ({ data }) => {
  let { content, user } = data;

  if (content.length > 700) content = content.slice(0, 700);

  const len = content.length;
  const spanLen = calcluateSpanLen(len);

  const gridStyle = { gridRow: `span ${spanLen}` };
  let bigContentStyle = {
    fontSize: "20pt",
    fontFamily: "'Raleway', sans-serif",
  };

  return (
    <li style={gridStyle}>
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

      <div id="content" style={len < 40 ? bigContentStyle : {}}>
        {content}
      </div>
    </li>
  );
};
