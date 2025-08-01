import type { ActivityComponentType } from "@stackflow/react";
import { lazy } from "react";
import Path from "./utils/path";

type Route = {
  path: (typeof Path)[keyof typeof Path];
  component: ActivityComponentType<any>;
  name: string;
};

const Form = lazy(() => import("@/pages/Form"));
const Main = lazy(() => import("@/pages/Main"));

const routes = [
  {
    path: Path.main,
    component: Main,
    name: "main",
  },
  {
    path: Path.form,
    component: Form,
    name: "form",
  },
] as const satisfies Route[];

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type RouteType = (typeof routes)[number];
export type RouteName = RouteType["name"];

type ToParams<T extends { [key: string]: any }> = {
  [key: string]: string | undefined;
} & {
  [key in keyof T]: T[key];
};

type ExtractRouteOptionalParam<
  T extends string,
  U = string | number | boolean,
> = T extends `${infer Param}?`
  ? { [k in Param]?: U }
  : T extends `${infer Param}*`
    ? { [k in Param]?: U }
    : T extends `${infer Param}+`
      ? { [k in Param]: U }
      : { [k in T]: U };

type ExtractRouteParams<
  T extends string,
  U = string | number | boolean,
> = string extends T
  ? { [k in string]?: U }
  : T extends `${string}:${infer ParamWithOptionalRegExp}/${infer Rest}`
    ? ParamWithOptionalRegExp extends `${infer Param}(${string})`
      ? ExtractRouteOptionalParam<Param, U> & ExtractRouteParams<Rest, U>
      : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U> &
          ExtractRouteParams<Rest, U>
    : T extends `${string}:${infer ParamWithOptionalRegExp}`
      ? ParamWithOptionalRegExp extends `${infer Param}(${string})`
        ? ExtractRouteOptionalParam<Param, U>
        : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U>
      : object;

export type RouteComponentMap<T extends RouteType = RouteType> =
  UnionToIntersection<
    T extends {
      name: infer Name extends string;
      component: ActivityComponentType<infer Params>;
      path: infer Path extends string;
    }
      ? {
          [key in Name]: React.ComponentType<{
            params: ToParams<ExtractRouteParams<Path, string> & Params>;
          }>;
        }
      : never
  >;

export type RoutePathMap<T extends RouteType = RouteType> = UnionToIntersection<
  T extends {
    name: infer Name extends string;
    path: infer Path;
  }
    ? { [key in Name]: Path }
    : never
>;

export default routes;
