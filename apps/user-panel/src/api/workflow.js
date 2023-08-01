import { commonRequestV1 } from "./common";

const path = (workflows) => "/workflows/" + workflows;

export const getAllWorkFlow = (filter) => {
  return commonRequestV1("get", path("?limit=100&filter=" + filter), {});
};
