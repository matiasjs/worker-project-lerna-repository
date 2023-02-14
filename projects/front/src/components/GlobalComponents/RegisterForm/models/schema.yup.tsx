import { object, string, array } from "yup";

const schema = object({
  name: string().required(),
  surname: string().required(),
  rol: object({
    value: string().required(),
    label: string().required(),
  }).required(),
  guilds: array()
    .of(
      object({
        value: string().required(),
        label: string().required(),
      })
    )
    .required(),
  email: string().email().required(),
  password: string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  // passwordConfirmation: string().test(
  //   "passwords-match",
  //   "Passwords must match",
  //   (value, context) => {
  //     console.log(value, context);
  //     return context.parent.password === value;
  //   }
  // ),
}).required();

export default schema;
