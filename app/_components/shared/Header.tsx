import { AppBar, List, ListItem, Toolbar, Typography } from "@mui/material";
import { ROUTES } from "@constants/routes";
import Link from "@components/shared/Link";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ justifyContent: "center", flexDirection: "row" }}
    >
      <Toolbar sx={{ maxWidth: "xl", flexGrow: 1, paddingInline: 0 }}>
        <Typography component="h1" sx={{ flexGrow: 1 }}>
          Image Manager
        </Typography>
        <nav>
          <List sx={{ display: "flex", gap: 3 }}>
            {Object.entries(ROUTES).map(([key, value]) => {
              return (
                <ListItem key={key} sx={{ paddingInline: 0 }}>
                  <Link
                    href={value.href}
                    color="#fff"
                    sx={{ textDecoration: "none" }}
                  >
                    {value.label}
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
