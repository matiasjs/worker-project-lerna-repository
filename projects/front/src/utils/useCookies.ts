import { serialize } from "cookie";

 const setCookie = (
  res: any,
  name: string,
  value: string,
  options: Record<string, unknown> = {}
    ) => {
      const stringValue = typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value)

      res.setHeader("Set-Cookie", serialize(name, JSON.stringify({stringValue, options})))
}

export default setCookie