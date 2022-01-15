import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Modal from "@mui/material/Modal";
import { Promotion, PromotionTypes, UserGroups } from "@promotions/common";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalHeader = styled(Typography)`
  font-size: 20px !important;
`;

const ModalRow = styled(Typography)`
  margin-top: 16px !important;
  display: flex;
  justify-content: space-between !important;
`;

const ButtonsRow = styled(Typography)`
  position: absolute;
  bottom: 5%;
  left: 5%;
`;

const LongInput = styled(TextField)`
  width: 100%;
`;

const SelectContainer = styled(FormControl)`
  width: 49%;
`;

const Input = styled(TextField)`
  width: 49%;
`;

const ConfirmBotton = styled(Button)`
  margin-right: 12px !important;
`;

interface Props {
  promotion: Promotion;
  isOpen: boolean;
  setIsOpen: (flag: boolean) => void;
  onConfirm: (promotion: Promotion) => Promise<void>;
}
export const PromotionEditModal = ({
  isOpen,
  setIsOpen,
  promotion,
  onConfirm,
}: Props) => {
  const [name, setName] = useState(promotion.name);
  const [type, setType] = useState(promotion.type);
  const [startDate, setStartDate] = useState(promotion.startDate);
  const [endDate, setEndDate] = useState(promotion.endDate);
  const [userGroup, setUserGroup] = useState(promotion.userGroup);

  const onNameChanged = (event: any) => setName(event?.target?.value);
  const onTypeChanged = (event: any) => setType(event?.target?.value);
  const onStartDateChanged = (date: any) => setStartDate(date);
  const onEndDateChanged = (date: any) => setEndDate(date);
  const onUserGroupChanged = (event: any) => setUserGroup(event?.target?.value);

  const handleClose = () => setIsOpen(false);
  const onCancledClicked = () => setIsOpen(false);

  const onConfirmClicked = async () => {
    const updatedPromotion: Promotion = {
      name,
      type,
      startDate,
      endDate,
      userGroup,
      _id: promotion._id,
    };
    await onConfirm(updatedPromotion);
    setIsOpen(false);
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalHeader>Edit Promotions</ModalHeader>

          <ModalRow>
            <LongInput
              label="Name"
              value={name}
              variant="outlined"
              onChange={onNameChanged}
            />
          </ModalRow>

          <ModalRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                maxDate={0}
                minDate={0}
                label="Start Date"
                value={startDate}
                onChange={onStartDateChanged}
                renderInput={(params) => <Input {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                maxDate={0}
                minDate={0}
                label="End Date"
                value={endDate}
                onChange={onEndDateChanged}
                renderInput={(params) => <Input {...params} />}
              />
            </LocalizationProvider>
          </ModalRow>
          <ModalRow>
            <SelectContainer>
              <InputLabel>Type</InputLabel>
              <Select defaultValue={type} label="Type" onChange={onTypeChanged}>
                {Object.keys(PromotionTypes).map((key) => (
                  <MenuItem
                    key={key}
                    value={PromotionTypes[key as keyof typeof PromotionTypes]}
                  >
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </SelectContainer>
            <SelectContainer>
              <InputLabel>User Group</InputLabel>
              <Select
                defaultValue={userGroup}
                label="User Group"
                onChange={onUserGroupChanged}
              >
                {Object.keys(UserGroups).map((key) => (
                  <MenuItem
                    key={key}
                    value={UserGroups[key as keyof typeof UserGroups]}
                  >
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </SelectContainer>
          </ModalRow>
          <ButtonsRow>
            <ConfirmBotton variant="contained" onClick={onConfirmClicked}>
              Confirm
            </ConfirmBotton>
            <Button
              variant="contained"
              color="error"
              onClick={onCancledClicked}
            >
              Cancel
            </Button>
          </ButtonsRow>
        </Box>
      </Modal>
    </div>
  );
};
