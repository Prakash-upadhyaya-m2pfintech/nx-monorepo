import { useNavigation } from "react-router-dom";
import Svg from "../assets/loading.svg";
{
  /* <Svg className="spinner" />; */
}
const Loading = () => {
  return (
    <>
      <section className="loader_align">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    </>
  );
};
export const ButtonLoading = () => {
  return <Svg className="spinner" />;
};

export default Loading;

export const useLoading = () => {
  const navigation = useNavigation();

  return navigation.state === "loading";
};
