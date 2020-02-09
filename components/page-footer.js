const CHARACTER_CODE_COPYRIGHT = 169;

export default () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>{`This is going to be the best blog ever. ${String.fromCharCode(
        CHARACTER_CODE_COPYRIGHT
      )} Copyright ${new Date().getFullYear().toString()}.`}</p>
    </div>
  </footer>
);
