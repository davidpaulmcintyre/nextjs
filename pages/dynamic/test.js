// import { getServerSideProps } from "../static/[id]";

const Test = (props) => {
  const { tests = [] } = props;
  return (
    <div>
      ssssss
      {tests.map((n) => (
        <div>{n}</div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const tests = await [1, 3, 55, 66];
  return {
    props: {
      tests,
    },
  };
  // return new Promise((resolve, reject) => {
  //     resolve({
  //         props: {
  //             tests: [{
  // props: {
  //     tests: [1, 3, 55, 66]
  // }
  //         }
  //     })
  // })
}

// export async function getStaticPaths() {
//     return await ({
//         paths: [
//             '/test/2', '/test/4'
//         ],
//         fallback: false
//     })
// }

export default Test;
