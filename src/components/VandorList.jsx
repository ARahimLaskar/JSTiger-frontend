import React, { useEffect, useState } from "react";

import { IconButton, Button, useDisclosure } from "@chakra-ui/react";
import { Pagination } from "./Pagination";
import { AddVendor } from "./AddVendor";
import { useDispatch, useSelector } from "react-redux";
import { getGoogleUser, getVendorData } from "../Redux/rootReducer";
import axios from "axios";
import { MemoizeDeleteModal } from "./DeleteModel";
import { MemoizedInputModal } from "./InputModal";
export const VandorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this as needed
  const totalItems = 100; // Change this as needed
  const { vendorData } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selectedVendor, setSelectedVendor] = useState({});
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  useEffect(() => {
    dispatch(getVendorData());
  }, []);

  const handleEdit = (vendor) => {
    setSelectedVendor(vendor);
    onEditOpen();
  };

  const handleDelete = (id) => {
    setSelectedVendor(id);
    onDeleteOpen();
  };
  return (
    <>
      <AddVendor />
      <div className="table-section">
        <div className="table-container">
          {}
          {/* <div id="loading_container">
          {status == "loading" && (
            <ReactLoading type="bubbles" color="#6558f5" width="100px" />
          )}
          {status == "failed" && (
            <>
              <img src={img} alt="Loading failed....Try again" />
              <p style={{ fontWeight: "500", color: "crimson" }}>
                Something went wrong... Try again!
              </p>
            </>
          )}
        </div> */}

          <table>
            <thead>
              <th>Vender Name</th>

              <th>Bank Account No.</th>
              <th>Bank Name</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>City</th>
              <th>Country</th>
              <th>Zip Code</th>
              <th></th>
            </thead>
            <tbody>
              {vendorData?.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e.vendorName}</td>
                    <td>{e.bankAccountNo}</td>
                    <td>{e.bankName}</td>
                    <td>{e.addressLine1}</td>
                    <td>{e.addressLine2}</td>
                    <td>{e.city}</td>
                    <td>{e.country}</td>
                    <td>{e.zip}</td>

                    <td className="centered-td">
                      <span
                        onClick={() => handleEdit(e)}
                        style={{ cursor: "pointer", color: "#145b26" }}
                        className="material-symbols-outlined"
                      >
                        edit_note
                      </span>

                      <span
                        onClick={() => handleDelete(e._id)}
                        style={{ cursor: "pointer", color: "crimson" }}
                        className="material-symbols-outlined"
                      >
                        delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      /> */}

        <MemoizedInputModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          item={selectedVendor}
        />
        <MemoizeDeleteModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          id={selectedVendor}
        />
      </div>
    </>
  );
};
