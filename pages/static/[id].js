const Test = (props) => {
  const { tests = [] } = props;
  return (
    <div>
      {tests.map((n) => (
        <div>{n}</div>
      ))}
    </div>
  );
};

export const getServerSideProps = (props) => {
  const { params } = props;
  const n = Number(params.id);
  return {
    props: {
      tests: [n * 1, n * 3, n * 55, n * 66],
    },
  };
};

// export async function getStaticPaths() {
//     return await ({
//         paths: [
//             '/test/2', '/test/4'
//         ],
//         fallback: false
//     })
// }

export default Test;
