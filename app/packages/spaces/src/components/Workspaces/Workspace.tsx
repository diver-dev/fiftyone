import { ColoredDot } from "@fiftyone/components";
import { canEditWorkspaces } from "@fiftyone/state";
import { Edit } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import "allotment/dist/style.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { workspaceEditorStateAtom } from "../../state";

export default function Workspace(props: WorkspacePropsType) {
  const { name, description, color, onClick, onEdit } = props;
  const setWorkspaceEditorState = useSetRecoilState(workspaceEditorStateAtom);
  const canEdit = useRecoilValue(canEditWorkspaces);
  const disabled = canEdit.enabled !== true;
  const disabledMsg = canEdit.message;

  return (
    <ListItem
      sx={{
        p: 0,
        background: (theme) => theme.palette.background.body,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        "&:hover": { ".workspace-actions-stack": { visibility: "visible" } },
      }}
      title={description}
    >
      <ListItemButton
        component="a"
        sx={{ py: 0.5, pr: 0.5 }}
        onClick={() => {
          if (onClick) onClick(name);
        }}
      >
        <ListItemIcon sx={{ minWidth: 32 }}>
          <ColoredDot color={color} />
        </ListItemIcon>
        <ListItemText primary={name} />
        <Stack
          direction="row"
          spacing={0}
          sx={{
            visibility: "hidden",
            cursor: disabled ? "not-allowed" : undefined,
          }}
          className="workspace-actions-stack"
          title={disabledMsg}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              if (disabled) return;
              e.preventDefault();
              e.stopPropagation();
              setWorkspaceEditorState((state) => ({
                ...state,
                open: true,
                edit: true,
                oldName: name,
                name,
                description,
                color,
              }));
              onEdit();
            }}
            disabled={disabled}
          >
            <Edit
              color={disabled ? "disabled" : "secondary"}
              sx={{ fontSize: 18 }}
            />
          </IconButton>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}

type WorkspacePropsType = {
  name: string;
  color: string;
  description: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, value: string) => void;
  onClick: (name: string) => void;
  onEdit: () => void;
};
