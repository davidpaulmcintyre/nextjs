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
export const getStaticProps = () => {
  return {
    props: {
      tests: [1, 3, 55, 66],
    },
  };
};

export default Test;
