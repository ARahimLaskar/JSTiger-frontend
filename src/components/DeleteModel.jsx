import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import axios from "axios";
import { getVendorData } from "../Redux/rootReducer";

const DeleteModal = ({ onOpen, isOpen, onClose, id }) => {
  const cancelRef = React.useRef();
  const dispatch = useDispatch();
  const [deleteToggle, setDeleteToggle] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`https://jstiger-backend.onrender.com/data/delete/${id}`)
      .then((res) => {
        alert("Item Deleted");
      });
    setDeleteToggle(!deleteToggle);
    onClose();
  };
  useEffect(() => {
    dispatch(getVendorData());
  }, [deleteToggle]);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleDelete} colorScheme="red" ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const MemoizeDeleteModal = React.memo(DeleteModal);
export { MemoizeDeleteModal };
