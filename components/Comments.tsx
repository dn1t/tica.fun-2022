declare global {
  interface Window {
    // deno-lint-ignore no-explicit-any
    Octomments: (o: any) => any;
    // deno-lint-ignore no-explicit-any
    OctommentsRenderer: (e: any, t: any) => any;
  }
}

const Comments: preact.FunctionComponent<{ issueNumber: number }> = ({
  issueNumber,
}) => {
  return (
    <div id="comments">
      <script src="/ocs.min.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html:
            `Octomments({github:{owner:"thoratica",repo:"tica.fun"},issueNumber:${issueNumber},renderer:[window.OctommentsRenderer,"#comments"]}).init();`,
        }}
      />
    </div>
  );
};

export default Comments;
