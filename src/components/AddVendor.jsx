import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MemoizedInputModal } from "./InputModal";
// import { useDispatch } from "react-redux";
// import { updateFilter } from "../Redux/todoSlice";
// import { MemoizedInputModal } from "./InputModal";

export const AddVendor = () => {
  const {
    isOpen: isOpenAddVendor,
    onOpen: onOpenAddVendor,
    onClose: onCloseAddVendor,
  } = useDisclosure();

  //   const dispatch = useDispatch();

  const handleFilter = (e) => {
    // dispatch(updateFilter(e.target.value));
  };

  return (
    <div className="add-section">
      <div className="add-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button size="sm" onClick={onOpenAddVendor} colorScheme="blue">
            Add Task &nbsp;
            <span className="material-symbols-outlined">add</span>{" "}
          </Button>
        </div>
        <form>
          <MemoizedInputModal
            isOpen={isOpenAddVendor}
            onClose={onCloseAddVendor}
          />
        </form>
      </div>
    </div>
  );
};
