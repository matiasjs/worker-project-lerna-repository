import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    surname: yup.string().required(),
    rolId: yup.string().required(),
    guildIds: yup.array(),
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const resolver = yupResolver(schema);

export default resolver;
