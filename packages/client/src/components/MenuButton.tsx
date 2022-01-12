import { useState, useContext } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { StyledMenu } from "./styles/StyledMenu";
import { PromotionsContext } from "../contexts/promotiosContext";

interface Props {
  promotionId: string;
}

export const MenuButton = ({ promotionId }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { duplicatePromotion, deletePromotion, editPromotion } =
    useContext(PromotionsContext);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeleteClicked = async () => {
    try {
      await deletePromotion(promotionId);
      Swal.fire("Promotion deleted successfuly", undefined, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Promotion deleted failed", undefined, "error");
    } finally {
      handleClose();
    }
  };

  const onDuplicateClicked = async () => {
    try {
      await duplicatePromotion(promotionId);
      Swal.fire("Promotion duplicated successfuly", undefined, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Promotion duplication failed", undefined, "error");
    } finally {
      handleClose();
    }
  };

  const onEditClicked = async () => {
    try {
      // @ts-ignore ADD EDIT
      await editPromotion(promotionId, {
      });
      Swal.fire("Promotion edited successfuly", undefined, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Promotion edit failed", undefined, "error");
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        //@ts-ignore
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={onEditClicked} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={onDuplicateClicked} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={onDeleteClicked} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
