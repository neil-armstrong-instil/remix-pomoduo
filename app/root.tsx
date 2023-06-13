import {cssBundleHref} from "@remix-run/css-bundle";
import type {LinksFunction} from "@remix-run/node";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import type {LinkDescriptor} from "@remix-run/server-runtime/dist/links";

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: stylesheet},
    ...cssBundle()
  ];
};

function cssBundle(): LinkDescriptor[] {
  if (!cssBundleHref) return [];

  return [
    {rel: "stylesheet", href: cssBundleHref}
  ];
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>

        {/* All meta exports on all routes will be injected here */}
        <Meta/>
        {/* All link exports on all routes will be injected here */}
        <Links/>
      </head>

      <body className="h-full">
        {/* Child routes be injected here */}
        <Outlet/>
        {/* Manages scroll position for view-side transitions */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <ScrollRestoration/>
        {/* Script tags be injected here */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <Scripts/>
        {/* Sets up automatic reload when you change code and only does anything during development */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <LiveReload/>
      </body>
    </html>
  );
}
