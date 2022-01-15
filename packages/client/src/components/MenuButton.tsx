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
import { PromotionEditModal } from "./styles/PromotionEditModal";
import { Promotion } from "@promotions/common";

interface Props {
  promotion: Promotion;
}

export const MenuButton = ({ promotion }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
      handleClose();
      const { isDenied } = await Swal.fire({
        title: "Delete Promotion",
        icon: "warning",
        text: "Are you sure?",
        showDenyButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        denyButtonText: `Delete`,
      });

      if (!isDenied) {
        return;
      }

      await deletePromotion(promotion._id!);
      Swal.fire("Promotion deleted successfuly", undefined, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Promotion deleted failed", undefined, "error");
    }
  };

  const onDuplicateClicked = async () => {
    try {
      handleClose();
      const { isConfirmed } = await Swal.fire({
        title: "Duplicate Promotion",
        icon: "warning",
        text: "Are you sure?",
        confirmButtonColor: '#3085d6',
        showConfirmButton: true,

        showCancelButton: true,
        confirmButtonText: `Duplicate`,
      });

      if (!isConfirmed) {
        return;
      }

      await duplicatePromotion(promotion._id!);
      Swal.fire("Promotion duplicated successfuly", undefined, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Promotion duplication failed", undefined, "error");
    }
  };

  const onEditClicked = async () => setIsOpen(true);

  const onEditConfirmed = async (promotion: Promotion) => {
    try {
      handleClose();
      await editPromotion(promotion._id!, promotion);
      Swal.fire("Promotion edited successfuly", undefined, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Promotion edit failed", undefined, "error");
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
      <PromotionEditModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        promotion={promotion}
        onConfirm={onEditConfirmed}
      />
    </div>
  );
};
