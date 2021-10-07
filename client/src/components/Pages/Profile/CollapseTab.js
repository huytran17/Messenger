import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import { ProfileTab } from "./index";

export default function CollapseTab(props) {
  return (
    <Collapse in={props.expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <ProfileTab />
      </CardContent>
    </Collapse>
  );
}
