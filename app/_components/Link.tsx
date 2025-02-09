import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

/**
 * Combines Next.js `NextLink` with Material-UI `MuiLink`
 * Inherits props from both components.
 */
type SharedLinkProps = Omit<MuiLinkProps, "href"> & NextLinkProps;

const Link = (props: SharedLinkProps) => {
  return <MuiLink component={NextLink} {...props} />;
};

export default Link;
