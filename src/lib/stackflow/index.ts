import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import routes, { type RouteComponentMap, type RoutePathMap } from "@/routes";
import { browserHistory } from "@/utils/history";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";

const Activities = routes.reduce(
  (acc, route) => ({
    ...acc,
    [route.name]: route.component,
  }),
  {} as RouteComponentMap
);

const Routes = routes.reduce(
  (acc, route) => ({
    ...acc,
    [route.name]: route.path,
  }),
  {} as RoutePathMap
);

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: Activities,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
    }),
    historySyncPlugin({
      history: browserHistory,
      routes: Routes,
      fallbackActivity: () => "main",
    }),
  ],
});
